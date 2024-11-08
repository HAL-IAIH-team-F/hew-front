"use server"

import {ApiResult, Results} from "../../util/err/result";
import {add, isAfter, isBefore, parseISO} from "date-fns";
import {ErrorIds} from "../../util/err/errorIds";
import {Session} from "next-auth";
import {auth, nextAuth} from "~/auth/auth";
import {apiClient} from "~/api/wrapper";
import {TokenBundleUtil} from "~/auth/TokenBundle";

export async function accessToken(): Promise<ApiResult<string>> {
  const session = await auth()
  const access = session?.apiTokenBundle?.access
  if (access) {
    const expire = add(new Date(access.expire || 0), {minutes: -1})
    if (isBefore(expire, Date.now())) return Results.createSuccessResult(access.token)
  }
  return await refreshToken()
}

async function refreshToken(): Promise<ApiResult<string>> {
  const session = await auth()
  if (!session) return Results.errResultByErrIdReason(ErrorIds.NoLogin, "session is undefined")

  const refresh = session?.apiTokenBundle?.refresh
  if (!refresh) {
    return refreshByKeycloak(session)
  }
  const expire = add(new Date(refresh.expire), {minutes: -1})
  if (isAfter(expire, Date.now())) {
    return refreshByKeycloak(session)
  }
  return refreshByRefreshToken(refresh.token, session)
}

async function refreshByKeycloak(session: Session): Promise<ApiResult<string>> {
  const token = await keycloakAccessToken(session)
  if (token.error) return token
  if (!token) return Results.errResultByErrIdReason(ErrorIds.NoLogin, "keycloak token is undefined")

  return await apiClient.post_token_api_token_post({keycloak_token: token.value}).then(value => {
    setTokenRes(session, value)
    return Results.createSuccessResult(value.access.token)
  }).catch(reason => {
    return Results.errResultByReason(reason, ErrorIds.RefreshTokenError)
  })
}

async function keycloakAccessToken(session: Session): Promise<ApiResult<string>> {
  const expire = session.keycloakTokenBundle?.access?.expire || 0
  if (session.keycloakTokenBundle?.access?.token && Date.now() < expire - 1000)
    return Results.createSuccessResult(session.keycloakTokenBundle?.access.token)
  await nextAuth.signOut()
  return Results.errResultByErrIdReason(ErrorIds.KeycloakRefreshError, "failed to sign out")
}

async function refreshByRefreshToken(token: string, session: Session): Promise<ApiResult<string>> {
  return await apiClient.token_refresh_api_token_refresh_get({
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(value => {
    setTokenRes(session, value)
    return Results.createSuccessResult(value.access.token)
  }).catch(reason => {
    return Results.errResultByReason(reason, ErrorIds.ApiError)
  })
}

function setTokenRes(
  session: Session,
  tokenRes: { access: { token: string, expire: string }, refresh: { token: string, expire: string } }
) {
  session.apiTokenBundle = TokenBundleUtil.create({
      token: tokenRes.access.token,
      expire: parseISO(tokenRes.access.expire).getTime(),
    }, {
      token: tokenRes.refresh.token,
      expire: parseISO(tokenRes.refresh.expire).getTime(),
    }
  )
}