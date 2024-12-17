import {AuthIdTokenState, IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";
import {useEffect, useRef} from "react";
import {add, isAfter, parseISO} from "date-fns";
import {Token} from "~/auth/nextauth/Token";
import {TokenBundle, TokenBundleUtil} from "~/auth/nextauth/TokenBundle";
import {Result, Results} from "../../../../util/err/result";
import {ErrorIds} from "../../../../util/err/errorIds";
import {Api} from "~/api/context/Api";
import {LoginSession} from "~/auth/session/refresh/LoginSession";


export default function RefreshTokenLoader(
  {
    update, idToken, reload, loginSession,
  }: {
    update: (loginSessionUpdate: LoginSession) => void,
    idToken: IdTokenState,
    reload: () => void,
    loginSession: LoginSession,
  },
) {
  const refreshing = useRef(false);

  useEffect(() => {
    if (idToken.state == "loading") return;
    if (idToken.state == "unauthenticated") {
      return update({state: "unauthenticated", idToken: idToken})
    }

    const next = loginSession.state == "authenticated" && loginSession.token.access
      ? add(new Date(loginSession.token.access.expire), {minutes: -1}).getTime() - Date.now() : 0

    const timeout = setTimeout(() => {
      if (refreshing.current) return
      refreshing.current = true;
      ApiRefresh.refreshToken(
        idToken,
        tokens => {
          refreshing.current = false;
          update({state: "authenticated", token: tokens, idToken: idToken})
        },
        reload, loginSession,
      ).then(value => {
        if (value.success) return
        console.error(value.error)
      })
    }, next)
    return () => {
      clearTimeout(timeout)
    }
  }, [idToken, loginSession.state]);

  return (
    <div>
    </div>
  )
}
namespace ApiRefresh {
  export async function refreshToken(
    idToken: AuthIdTokenState,
    update: (tokens: TokenBundle) => void,
    reload: () => void,
    session: LoginSession,
  ): Promise<Result<undefined>> {
    if (session.state == "loading") return await KeycloakRefresh.refreshByKeycloak(idToken, update, reload)
    if (session.state == "unauthenticated") return await KeycloakRefresh.refreshByKeycloak(idToken, update, reload)

    const refresh = session.token.refresh

    if (!refresh) return await KeycloakRefresh.refreshByKeycloak(idToken, update, reload)

    if (isExpire(refresh.expire)) return KeycloakRefresh.refreshByKeycloak(idToken, update, reload)

    return refreshByRefreshToken(refresh, update)
  }

  function isExpire(expireNum: number) {
    const expire = add(new Date(expireNum), {minutes: -1})
    return isAfter(expire, Date.now())
  }

  async function refreshByRefreshToken(
    token: Token,
    update: (tokens: TokenBundle) => void,
  ): Promise<Result<undefined>> {
    return await Api.app.gtr_api_token_get({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(value => {
      update(createTokenBundle(value))
      return Results.createSuccessResult(undefined)
    }).catch(reason => {
      return Results.errResultByReason(reason, ErrorIds.ApiError)
    })
  }
}
namespace KeycloakRefresh {
  export async function refreshByKeycloak(
    idTokenState: AuthIdTokenState,
    update: (tokens: TokenBundle) => void,
    reload: () => void,
  ): Promise<Result<undefined>> {
    const token = keycloakAccessToken(idTokenState, reload)
    if (token == undefined) return Results.createSuccessResult(undefined)


    return await Api.app.post_token_api_token_post({keycloak_token: token}).then(value => {
      update(createTokenBundle(value))
      return Results.createSuccessResult(undefined)
    }).catch(reason => {
      return Results.errResultByReason(reason, ErrorIds.RefreshTokenError)
    })
  }

  function keycloakAccessToken(
    idTokenState: AuthIdTokenState,
    reload: () => void,
  ): string | undefined {
    const token = idTokenState.accessToken
    if (Date.now() < add(token.expireDate, {minutes: -1}).getTime())
      return token.token
    reload()
    return undefined
  }
}

export function createToken(value: any) {
  return {token: value.token, expire: parseISO(value.expire).getTime()}
}

export function createTokenBundle(value: any) {
  return TokenBundleUtil.create(
    createToken(value.access),
    createToken(value.refresh),
  )
}