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

  async exec<T extends AxiosRequestConfig, R>(func: (opt: T) => Promise<R>, opt: T): Promise<ApiResult<R>> {
    let authorization = undefined
    if (opt.headers?.Authorization) {
      authorization = opt.headers?.Authorization
    } else if (this.session) {
      const result = await accessToken()
      if (result.error) return result
      authorization = `Bearer ${result.value}`
    }

    return await func({
      headers: {
        Authorization: authorization,
        ...opt.headers,
      },
      ...opt,
    }).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

}