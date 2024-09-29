import {createApiClient} from "@/_api/client";
import {AxiosRequestConfig} from "axios";
import {Session} from "next-auth";
import {add, isAfter, isBefore, parseISO} from "date-fns";
import {ApiResult, Results} from "../../util/err/result";
import {ErrorIds} from "../../util/err/errors";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const apiClient = createApiClient("/", {
  axiosConfig: {baseURL: baseUrl}
});

export function getClientContext(session: Session): ClientContext {
  return new ClientContext(session)
}

export class ClientContext {
  constructor(
    private readonly session: Session | undefined
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
      .catch(reason => Results.createErrorResult(ErrorIds.ApiError, reason))
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
    if (!token) return Results.createErrorResult(ErrorIds.NoLogin, "keycloak token is undefined")
    const session = this.session
    if (!session) return Results.createErrorResult(ErrorIds.NoLogin, "session is undefined")

    return await apiClient.post_token_api_token_post({keycloak_token: token}).then(value => {
      session.access = {
        token: value.access.token,
        expire: value.access.expire,
      }
      session.refresh = {
        token: value.refresh.token,
        expire: value.refresh.expire,
      }
      return Results.createSuccessResult(value.access.token)
    }).catch(reason => Results.createErrorResult(ErrorIds.ApiError, reason))
  }

  private async refreshByRefreshToken(token: string): Promise<ApiResult<string>> {
    return Results.createErrorResult(ErrorIds.NotImplement, "Todo")
  }
}