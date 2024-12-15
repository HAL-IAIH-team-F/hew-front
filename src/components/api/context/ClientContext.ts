import {AxiosRequestConfig} from "axios";
import {Result, Results} from "../../../util/err/result";
import {ErrorIds} from "../../../util/err/errorIds";
import {apiClient, imgApiClient} from "~/api/context/wrapper";
import {LoginSession} from "~/auth/session/refresh/LoginSession";
import {IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";

export class ClientContext {
  constructor(
    readonly session: LoginSession,
    public readonly idToken: IdTokenState,
  ) {
  }

  status(): "loading" | "unauthenticated" | "authenticated" {
    if (this.session.state == "loading") return "loading"
    if (this.session.state == "unauthenticated") return "unauthenticated"
    return "authenticated"
  }

  async execBody<B, R>(func: (body: B, opt: AxiosRequestConfig) => Promise<R>, body: B, opt?: AxiosRequestConfig): Promise<Result<R>> {
    const newOpt: AxiosRequestConfig = opt || {}
    if (!newOpt.headers) {
      newOpt.headers = {}
    }

    if (!newOpt.headers.Authorization && this.session.state == "authenticated") {
      const token = this.session.token.access?.token
      if (!token) return Results.errResultByReason("token is undefined", ErrorIds.UnknownError,)
      newOpt.headers.Authorization = `Bearer ${token}`
    }

    return await func(body, newOpt).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

  async exec<R>(func: (opt: AxiosRequestConfig) => Promise<R>, opt?: AxiosRequestConfig): Promise<Result<R>> {
    return this.execBody((_, opt1) => func(opt1), null, opt)
  }

  async uploadImg(file: File) {
    const token = await this.exec(apiClient.image_token_api_token_image_get)
    if (token.error) return token

    return await imgApiClient.upload_image_upload__post(
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
