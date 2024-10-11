import {createApiClient} from "@/_api/client";
import {AxiosRequestConfig} from "axios";
import {Session} from "next-auth";
import {ApiResult, Results} from "../../util/err/result";
import {ErrorIds} from "../../util/err/errorIds";
import {accessToken} from "@/_api/serverWrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const apiClient = createApiClient(baseUrl, {});

export function getClientContext(session: Session | null): ClientContext {
  return new ClientContext(session)
}

export class ClientContext {
  constructor(
    private readonly session: Session | null
  ) {
  }

  async execBody<B, R>(func: (body: B, opt: AxiosRequestConfig) => Promise<R>, body: B, opt?: AxiosRequestConfig): Promise<ApiResult<R>> {
    const newOpt: AxiosRequestConfig = opt || {}
    if (!newOpt.headers) {
      newOpt.headers = {}
    }
    if (!newOpt.headers.Authorization) {
      if (this.session) {
        const result = await accessToken()
        if (!result) return Results.errResultByErrIdReason(ErrorIds.UnknownError, "result is undefined")
        if (result.error) return result
        newOpt.headers.Authorization = `Bearer ${result.value}`
      }
    }

    return await func(body, newOpt).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

  async exec<R>(func: (opt: AxiosRequestConfig) => Promise<R>, opt?: AxiosRequestConfig): Promise<ApiResult<R>> {
    return this.execBody((body, opt1) => func(opt1), null, opt)
  }

}