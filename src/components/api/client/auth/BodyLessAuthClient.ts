import {BodyLessFunc, BodyLessParams, BodyLessParamsLessOpt, Res} from "~/api/client/Client";
import {Result, Results} from "../../../../util/err/result";
import {ErrorIds} from "../../../../util/err/errorIds";
import {AuthSession} from "~/auth/refresh/LoginSession";

export class BodyLessAuthClient {

  constructor(
    protected readonly session: AuthSession,
  ) {
  }

  unAuthOrAuth<F extends BodyLessFunc>(
    func: F, opt: BodyLessParamsLessOpt<F>, params: BodyLessParams<F>
  ): Promise<Result<Res<F>>> {
    return this.auth(func, opt, params)
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

}