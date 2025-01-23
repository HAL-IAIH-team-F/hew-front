import {BodyLessFunc, BodyLessParams, BodyLessParamsLessOpt, Res} from "~/api/client/Client";
import {Result, Results} from "../../../../util/err/result";
import {ErrorIds} from "../../../../util/err/errorIds";

export class BodyLessAuthClient {

  constructor(
    protected readonly token: string,
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
      const token = this.token
      if (!token) return Results.errResultByReason("token is undefined", ErrorIds.UnknownError)
      opt.headers.Authorization = `Bearer ${token}`
    }
    return await func({...opt, params: params}).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

}