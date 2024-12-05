import {TokenBundle, TokenBundleUtil} from "~/auth/TokenBundle";
import {Session} from "next-auth";
import {ApiResult, Results} from "../../util/err/result";
import {add, isAfter, parseISO} from "date-fns";
import {apiClient} from "~/api/wrapper";
import {ErrorIds} from "../../util/err/errorIds";
import {reSignIn} from "~/api/serverWrapper";

export async function refreshToken(current: TokenBundle, session: Session): Promise<ApiResult<TokenBundle>> {
  const refresh = current?.refresh
  if (!refresh) {
    return refreshByKeycloak(session.keycloakTokenBundle)
  }

  const expire = add(new Date(refresh.expire), {minutes: -1})
  if (isAfter(expire, Date.now())) {
    return refreshByKeycloak(session.keycloakTokenBundle)
  }
  return refreshByRefreshToken(refresh.token)
}

async function refreshByRefreshToken(token: string): Promise<ApiResult<TokenBundle>> {
  return await apiClient.gtr_api_token_get({
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(value => {
    return createTokenBundle(value)
  }).catch(reason => {
    return Results.errResultByReason(reason, ErrorIds.ApiError)
  })
}

export async function refreshByKeycloak(keycloakToken: TokenBundle | undefined): Promise<ApiResult<TokenBundle>> {
  const token = await keycloakAccessToken(keycloakToken)
  if (token.error) return token
  if (!token) return Results.errResultByErrIdReason(ErrorIds.NoLogin, "keycloak token is undefined")

  return await apiClient.post_token_api_token_post({keycloak_token: token.value}).then(value => {
    return createTokenBundle(value)
  }).catch(reason => {
    return Results.errResultByReason(reason, ErrorIds.RefreshTokenError)
  })
}

async function keycloakAccessToken(keycloakToken: TokenBundle | undefined): Promise<ApiResult<string>> {
  const access = keycloakToken?.access
  const expire = access?.expire || 0
  if (access?.token && Date.now() < add(new Date(expire),{minutes: -1}).getTime())
    return Results.createSuccessResult(access.token)
  await reSignIn()
  return Results.errResultByErrIdReason(ErrorIds.KeycloakRefreshError, "failed to sign out")
}

export function createTokenBundle(value: any) {
  return Results.createSuccessResult(TokenBundleUtil.create(
    {token: value.access.token, expire: parseISO(value.access.expire).getTime()},
    {token: value.refresh.token, expire: parseISO(value.refresh.expire).getTime()},
  ))
}