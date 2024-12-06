import {AxiosRequestConfig} from "axios";
import {ApiResult, Results} from "../../util/err/result";
import {ErrorIds} from "../../util/err/errorIds";
import {apiClient, imgApiClient} from "~/api/wrapper";
import {SessionContextValue} from "next-auth/react";

export class ClientContext {
  constructor(
    private readonly session: SessionContextValue
  ) {
  }

  isLogin() {
    if (this.session.status == "loading") return false
    if (this.session.data == undefined) return false
    if (!this.session.data.loaded) return false
    return this.session.status == "authenticated"
  }

  isLoading() {
    const session = this.session;
    if (session.status == "loading") return true
    if (session.status == "unauthenticated") return false
    if (session.data == undefined) return false
    return !session.data.loaded
  }

  async execBody<B, R>(func: (body: B, opt: AxiosRequestConfig) => Promise<R>, body: B, opt?: AxiosRequestConfig): Promise<ApiResult<R>> {
    const newOpt: AxiosRequestConfig = opt || {}
    if (!newOpt.headers) {
      newOpt.headers = {}
    }

    if (!newOpt.headers.Authorization && this.session?.status == "authenticated") {
      const token = this.session.data.accessToken?.token
      if (!token) return Results.errResultByErrIdReason(ErrorIds.UnknownError, "token is undefined")
      newOpt.headers.Authorization = `Bearer ${token}`
    }

    return await func(body, newOpt).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

  async exec<R>(func: (opt: AxiosRequestConfig) => Promise<R>, opt?: AxiosRequestConfig): Promise<ApiResult<R>> {
    return this.execBody((_, opt1) => func(opt1), null, opt)
  }

  async uploadImg(file: File) {
    const token = await this.exec(apiClient.image_token_api_token_image_get)
    if (token.error) return token

    return await imgApiClient.upload_image_upload__post(
      {file: file},
      {
        headers: {Authorization: `Bearer ${token.value.upload.token}`}
      }
    ).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }
}

export namespace ClientContextUtil {
  export function getClientContext(session: SessionContextValue): ClientContext {
    return new ClientContext(session)
  }
}