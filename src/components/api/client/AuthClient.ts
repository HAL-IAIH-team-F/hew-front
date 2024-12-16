import {AxiosRequestConfig} from "axios";
import {Result, Results} from "../../../util/err/result";
import {ErrorIds} from "../../../util/err/errorIds";
import {Api} from "~/api/context/Api";
import {LoadedClient} from "~/api/client/LoadedClient";
import {AuthSession} from "~/auth/session/refresh/LoginSession";

export class AuthClient extends LoadedClient {

  constructor(
    protected readonly session: AuthSession,
  ) {
    super();
  }

  async unAuthOrAuthBody<B, R>(
    func: (body: B, opt: AxiosRequestConfig) => Promise<R>, body: B, opt?: AxiosRequestConfig
  ): Promise<Result<R>> {
    return await this.authBody(func, body, opt)
  }

  async authBody<B, R>(
    func: (body: B, opt: AxiosRequestConfig) => Promise<R>, body: B, opt?: AxiosRequestConfig
  ): Promise<Result<R>> {
    const newOpt: AxiosRequestConfig = opt || {}
    if (!newOpt.headers) {
      newOpt.headers = {}
    }

    if (!newOpt.headers.Authorization) {
      const token = this.session.token.access?.token
      if (!token) return Results.errResultByReason("token is undefined", ErrorIds.UnknownError,)
      newOpt.headers.Authorization = `Bearer ${token}`
    }

    return await func(body, newOpt).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

  async auth<R>(func: (opt: AxiosRequestConfig) => Promise<R>, opt?: AxiosRequestConfig): Promise<Result<R>> {
    return this.authBody((_, opt1) => func(opt1), null, opt)
  }

  async uploadImg(file: File) {
    const token = await this.auth(Api.app.image_token_api_token_image_get)
    if (token.error) return token

    return await Api.img.upload_image_upload__post(
      {file: file},
      {
        headers: {Authorization: `Bearer ${token.success.upload.token}`}
      }
    ).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }
}