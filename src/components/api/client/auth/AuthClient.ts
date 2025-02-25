import {Result, Results} from "../../../../util/err/result";
import {ErrorIds} from "../../../../util/err/errorIds";
import {Api} from "~/api/context/Api";
import {LoadedClient} from "~/api/client/LoadedClient";
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
import {BodiedAuthClient} from "~/api/client/auth/BodiedAuthClient";
import {BodyLessAuthClient} from "~/api/client/auth/BodyLessAuthClient";

export class AuthClient extends LoadedClient {
  private readonly bodiedClient = new BodiedAuthClient(this.token)
  private readonly bodyLessClient = new BodyLessAuthClient(this.token)

  constructor(
    protected readonly token: string,
  ) {
    super();
  }

  async authBody<F extends BodiedFunc>(
    func: F, opt: BodiedParamsLessOpt<F>, body: ApiBody<F>, params: BodiedParams<F>
  ): Promise<Result<Res<F>>> {
    // console.debug("authBody", func, opt, body, params)
    return this.bodiedClient.authBody(func, opt, body, params)
  }

  unAuthOrAuthBody<F extends BodiedFunc>(func: F, opt: BodiedParamsLessOpt<F>, body: ApiBody<F>, params: BodiedParams<F>): Promise<Result<Res<F>>> {
    return this.bodiedClient.unAuthOrAuthBody(func, opt, body, params)
  }


  async auth<F extends BodyLessFunc>(
    func: F, opt: BodyLessParamsLessOpt<F>, params: BodyLessParams<F>
  ): Promise<Result<Res<F>>> {
    return this.bodyLessClient.auth(func, opt, params)
  }

  unAuthOrAuth<F extends BodyLessFunc>(
    func: F, opt: BodyLessParamsLessOpt<F>, params: BodyLessParams<F>
  ): Promise<Result<Res<F>>> {
    return this.bodyLessClient.unAuthOrAuth(func, opt, params)
  }

  async uploadImg(file: File) {
    const token = await this.auth(Api.app.gettfu_api_token_file_upload_get, {}, {})
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