import {ApiBody, BodiedFunc, BodiedParams, BodiedParamsLessOpt, Res} from "~/api/client/Client";
import {Result, Results} from "../../../../util/err/result";
import {ErrorIds} from "../../../../util/err/errorIds";

export class BodiedAuthClient {
  constructor(
    protected readonly token: string,
  ) {
  }


  async authBody<F extends BodiedFunc>(
    func: F, opt: BodiedParamsLessOpt<F>, body: ApiBody<F>, params: BodiedParams<F>
  ): Promise<Result<Res<F>>> {
    if (!opt.headers) {
      opt.headers = {}
    }

    if (!opt.headers.Authorization) {
      const token = this.token
      if (!token) return Results.errResultByReason("token is undefined", ErrorIds.UnknownError)
      opt.headers.Authorization = `Bearer ${token}`
    }
    // console.debug("authBody", func, opt, body, params)
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

}