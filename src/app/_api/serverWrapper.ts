"use server"

import {ApiResult, Results} from "../../util/err/result";
import {add, isAfter, isBefore, parseISO} from "date-fns";
import {ErrorIds} from "../../util/err/errorIds";
import {Session} from "next-auth";
import axios, {AxiosResponse} from "axios";
import {ErrorRes} from "../../util/err/errorRes";
import {Err} from "../../util/err/err";
import {auth, keycloakConfig, tokenUrl} from "~/_auth/auth";
import {apiClient} from "@/_api/wrapper";

export async function accessToken(): Promise<ApiResult<string>> {
  const session = await auth()
  const access = session?.access
  if (access) {
    let expire = parseISO(access.expire)
    expire = add(expire, {minutes: -1})
    if (isBefore(expire, Date.now())) return Results.createSuccessResult(access.token)
  }
  return await refreshToken()
}

async function refreshToken(): Promise<ApiResult<string>> {
  const session = await auth()
  if (!session) return Results.errResultByErrIdReason(ErrorIds.NoLogin, "session is undefined")

  const refresh = session?.refresh
  if (!refresh) {
    return refreshByKeycloak(session)
  }
  let expire = parseISO(refresh.expire)
  expire = add(expire, {minutes: -1})
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
    if (!axios.isAxiosError(reason)) return Results.errResultByErrIdReason(ErrorIds.ApiError, reason)
    const res: AxiosResponse<ErrorRes> | undefined = reason.response
    if (!res) return Results.errResultByErrIdReason(ErrorIds.ApiError, reason)
    return Results.errResultByErrorData(Err.createErrorData(res.data))
  })
}

async function keycloakAccessToken(session: Session): Promise<ApiResult<string>> {
  const expire = session.accessTokenExpires || 0
  if (session.keycloak_access_token && Date.now() < expire - 1000)
    return Results.createSuccessResult(session.keycloak_access_token)
  return await refreshKeycloak(session)
}

async function refreshKeycloak(session: Session): Promise<ApiResult<string>> {
  const refreshToken = session.keycloak_refresh_token
  if (!refreshToken)
    return Results.errResultByErrIdReason(ErrorIds.KeycloakRefreshError, "keycloak refresh token is undefined")

  try {
    const formData = new FormData()
    formData.append("client_id", keycloakConfig.clientId)
    formData.append("client_secret", keycloakConfig.clientSecret)
    formData.append("grant_type", "refresh_token")
    formData.append("refresh_token", refreshToken)

    const response = await fetch(tokenUrl, {
      headers: {},
      body: formData,
      method: "POST",
    }).then(value => Results.createSuccessResult(value))
      .catch(reason => Results.errResultByErrIdReason(ErrorIds.KeycloakRefreshError, reason))
    if (response.error) return response
    const refreshedTokens = await response.value.json()

    if (!response.value.ok) {
      return Results.errResultByErrIdReason(
        ErrorIds.KeycloakRefreshResponseError,
        response.value.status + ": " + response.value.statusText + ", " + JSON.stringify(refreshedTokens)
      )
    }

    session.keycloak_access_token = refreshedTokens.access_token
    session.accessTokenExpires = Date.now() + refreshedTokens.expires_in * 1000
    session.keycloak_refresh_token = refreshedTokens.refresh_token || refreshToken
    return refreshedTokens.access_token
  } catch (error) {
    return Results.errResultByErrIdReason(ErrorIds.KeycloakRefreshError, error)
  }
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
    console.error(reason)
    return Results.errResultByErrIdReason(ErrorIds.ApiError, reason)
  })
}

function setTokenRes(
  session: Session,
  tokenRes: { access: { token: string, expire: string }, refresh: { token: string, expire: string } }
) {
  session.access = {
    token: tokenRes.access.token,
    expire: tokenRes.access.expire,
  }
  session.refresh = {
    token: tokenRes.refresh.token,
    expire: tokenRes.refresh.expire,
  }
}