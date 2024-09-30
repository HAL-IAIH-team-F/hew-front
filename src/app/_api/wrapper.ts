import {createApiClient} from "@/_api/client";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Session} from "next-auth";
import {add, isAfter, isBefore, parseISO} from "date-fns";
import {ApiResult, Results} from "../../util/err/result";
import {ErrorRes} from "../../util/err/errorRes";
import {ErrorIds} from "../../util/err/errorIds";
import {Err} from "../../util/err/err";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
const cors = process.env.NEXT_PUBLIC_CORS as string;
console.debug("baseUrl", baseUrl)
export const apiClient = createApiClient(baseUrl, {});

export function getClientContext(session: Session | null): ClientContext {
  return new ClientContext(session)
}

export class ClientContext {
  constructor(
    private readonly session: Session | null
  ) {
  }

  async exec<T extends AxiosRequestConfig, R>(func: (opt: T) => Promise<R>, opt: T): Promise<ApiResult<R>> {
    let authorization = undefined
    if (opt.headers?.Authorization) {
      authorization = opt.headers?.Authorization
    } else if (this.session) {
      const result = await this.accessToken()
      if (result.error) return result
      authorization = `Bearer ${await this.accessToken()}`
    }

    return await func({
      headers: {
        Authorization: authorization,
        ...opt.headers,
      },
      ...opt,
    }).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        console.error(reason)
        return Results.errorResultByErrIdReason(ErrorIds.ApiError, reason)
      })
  }

  private async accessToken(): Promise<ApiResult<string>> {
    const access = this.session?.access
    if (access) {
      let expire = parseISO(access.expire)
      expire = add(expire, {minutes: -1})
      if (isBefore(expire, Date.now())) return Results.createSuccessResult(access.token)
    }
    return await this.refreshToken()
  }

  private async refreshToken(): Promise<ApiResult<string>> {
    const refresh = this.session?.refresh
    if (!refresh) {
      return this.refreshByKeycloak()
    }
    let expire = parseISO(refresh.expire)
    expire = add(expire, {minutes: -1})
    if (isAfter(expire, Date.now())) {
      return this.refreshByKeycloak()
    }
    return this.refreshByRefreshToken(refresh.token)
  }

  private async refreshByKeycloak(): Promise<ApiResult<string>> {
    const token = this.session?.keycloak_access_token
    if (!token) return Results.errorResultByErrIdReason(ErrorIds.NoLogin, "keycloak token is undefined")
    const session = this.session
    if (!session) return Results.errorResultByErrIdReason(ErrorIds.NoLogin, "session is undefined")

    return await apiClient.post_token_api_token_post({keycloak_token: token}).then(value => {
      this.setTokenRes(session, value)
      return Results.createSuccessResult(value.access.token)
    }).catch(reason => {
      if (!axios.isAxiosError(reason)) return Results.errorResultByErrIdReason(ErrorIds.ApiError, reason)
      const res: AxiosResponse<ErrorRes> | undefined = reason.response
      if (!res) return Results.errorResultByErrIdReason(ErrorIds.ApiError, reason)
      return Results.errorResByErrorData(Err.createErrorData(res.data))
    })
  }

  private async refreshByRefreshToken(token: string): Promise<ApiResult<string>> {
    const session = this.session
    if (!session) return Results.errorResultByErrIdReason(ErrorIds.NoLogin, "session is undefined")

    return await apiClient.token_refresh_api_token_refresh_get({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(value => {
      this.setTokenRes(session, value)
      return Results.createSuccessResult(value.access.token)
    }).catch(reason => {
      console.error(reason)
      return Results.errorResultByErrIdReason(ErrorIds.ApiError, reason)
    })
  }

  private setTokenRes(
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
}