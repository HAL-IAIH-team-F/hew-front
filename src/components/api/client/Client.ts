import {AxiosRequestConfig} from "axios";
import {Result, Results} from "../../../util/err/result";
import {ErrorIds} from "../../../util/err/errorIds";

export class Client {

  async unAuthBody<B, R>(func: (body: B, opt: AxiosRequestConfig) => Promise<R>, body: B, opt?: AxiosRequestConfig): Promise<Result<R>> {
    return await func(body, opt || {}).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

  async unAuth<R>(func: (opt: AxiosRequestConfig) => Promise<R>, opt?: AxiosRequestConfig): Promise<Result<R>> {
    return this.unAuthBody((_, opt1) => func(opt1), null, opt)
  }

}
