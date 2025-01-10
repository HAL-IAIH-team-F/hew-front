import {Result, Results} from "../../../util/err/result";
import {ErrorIds} from "../../../util/err/errorIds";
import {Api} from "~/api/context/Api";
import {LoadedClient} from "~/api/client/LoadedClient";
import {AuthSession} from "~/auth/refresh/LoginSession";
import {
  ApiBody,
  BodiedFunc,
  BodiedParams,
  BodiedParamsLessOpt,
  BodyLessFunc,
  BodyLessParams,
  BodyLessParamsLessOpt,
  Res
} from "~/api/client/Client";

export class AuthClient extends LoadedClient {
  constructor(
    protected readonly session: AuthSession,
  ) {
    super();
  }

  unAuthOrAuth<F extends BodyLessFunc>(
    func: F, opt: BodyLessParamsLessOpt<F>, params: BodyLessParams<F>
  ): Promise<Result<Res<F>>> {
    return this.auth(func, opt, params)
  }


  async authBody<F extends BodiedFunc>(
    func: F, opt: BodiedParamsLessOpt<F>, body: ApiBody<F>, params: BodiedParams<F>
  ): Promise<Result<Res<F>>> {
    if (!opt.headers) {
      opt.headers = {}
    }

    if (!opt.headers.Authorization) {
      const token = this.session.token.access?.token
      if (!token) return Results.errResultByReason("token is undefined", ErrorIds.UnknownError)
      opt.headers.Authorization = `Bearer ${token}`
    }
    return await func(body, {...opt, params: params}).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

  async unAuthOrAuthBody<F extends BodiedFunc>(
    func: F, opt: BodiedParamsLessOpt<F>, body: ApiBody<F>, params: BodiedParams<F>
  ): Promise<Result<Res<F>>> {
    return await this.authBody(func, opt, body, params)
  }


  async auth<F extends BodyLessFunc>(
    func: F, opt: BodyLessParamsLessOpt<F>, params: BodyLessParams<F>
  ): Promise<Result<Res<F>>> {
    if (!opt.headers) {
      opt.headers = {}
    }

    if (!opt.headers.Authorization) {
      const token = this.session.token.access?.token
      if (!token) return Results.errResultByReason("token is undefined", ErrorIds.UnknownError)
      opt.headers.Authorization = `Bearer ${token}`
    }
    return await func({...opt, params: params}).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

  async uploadImg(file: File) {
    const token = await this.auth(Api.app.image_token_api_token_image_get, {}, {})
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