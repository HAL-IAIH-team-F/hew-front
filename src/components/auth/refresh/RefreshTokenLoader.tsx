import {useEffect, useRef} from "react";
import {add, isAfter, parseISO} from "date-fns";
import {Token} from "~/auth/nextauth/Token";
import {TokenBundle, TokenBundleUtil} from "~/auth/nextauth/TokenBundle";
import {Result, Results} from "../../../util/err/result";
import {ErrorIds} from "../../../util/err/errorIds";
import {Api} from "~/api/context/Api";
import {LoginSession} from "~/auth/refresh/LoginSession";
import {AuthIdTokenState, IdTokenState} from "~/auth/idtoken/IdTokenState";


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
    console.debug("refresh", idToken, loginSession)

    if (idToken.state == "loading") return;
    if (idToken.state == "unauthenticated") {
      return update({state: "unauthenticated", idToken: idToken})
    }

    const next = loginSession.state == "authenticated" && loginSession.token.access
      ? add(new Date(loginSession.token.access.expire), {minutes: -1}).getTime() - Date.now() : 0
    console.debug("next", next, new Date(Date.now() + next))
    const timeout = setTimeout(() => {
      console.debug("refresh timeout", refreshing.current)
      if (refreshing.current) return
      refreshing.current = true;
      ApiRefresh.refreshToken(
        idToken,
        tokens => {
          console.debug("refreshToken success", tokens)
          update({state: "authenticated", token: tokens, idToken: idToken})
        },
        reload, loginSession,
      ).then(value => {
        refreshing.current = false;
        if (!value.error) return
        console.error("refresh token error", value.error)
        update({state: "unauthenticated", idToken: idToken})
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
    console.debug("refreshToken", idToken, session)
    if (session.state == "loading") return await KeycloakRefresh.refreshByKeycloak(idToken, update, reload)
    if (session.state == "unauthenticated") return await KeycloakRefresh.refreshByKeycloak(idToken, update, reload)

    const refresh = session.token.refresh

    console.debug("refreshToken refresh", refresh)
    if (!refresh) return await KeycloakRefresh.refreshByKeycloak(idToken, update, reload)

    console.debug("refreshToken isExpire", isExpire(refresh.expire))
    if (isExpire(refresh.expire)) return KeycloakRefresh.refreshByKeycloak(idToken, update, reload)

    return refreshByRefreshToken(refresh, update)
  }

  function isExpire(expireNum: number) {
    console.debug("isExpire", expireNum, new Date(expireNum))
    const expire = add(new Date(expireNum), {minutes: -1})
    return !isAfter(expire, Date.now())
  }

  async function refreshByRefreshToken(
    token: Token,
    update: (tokens: TokenBundle) => void,
  ): Promise<Result<undefined>> {
    console.debug("refreshByRefreshToken", token)
    return await Api.app.gtr_api_token_get({
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    }).then(value => {
      console.debug("refreshByRefreshToken then", value)
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
    console.debug("refreshByKeycloak", idTokenState)
    const token = keycloakAccessToken(idTokenState, reload)
    console.debug("refreshByKeycloak token")
    if (token == undefined) return Results.createSuccessResult(undefined)

    return await Api.app.post_token_api_token_post({keycloak_token: token}).then(value => {
      console.debug("refreshByKeycloak result")
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
    console.debug("keycloakAccessToken", idTokenState)
    const token = idTokenState.accessToken
    if (Date.now() < add(token.expireDate, {minutes: -1}).getTime())
      return token.token
    console.debug("request reload")
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