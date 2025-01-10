import {ApiBody, BodiedFunc, BodiedParams, BodiedParamsLessOpt, Res} from "~/api/client/Client";
import {Result, Results} from "../../../../util/err/result";
import {ErrorIds} from "../../../../util/err/errorIds";
import {AuthSession} from "~/auth/refresh/LoginSession";

export class BodiedAuthClient {
  constructor(
    protected readonly session: AuthSession,
  ) {
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

}