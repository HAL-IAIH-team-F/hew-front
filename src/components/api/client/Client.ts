import {Result, Results} from "../../../util/err/result";
import {ErrorIds} from "../../../util/err/errorIds";

export type BodiedFunc = (body: any | null, opt: { headers?: { Authorization?: string }, params: any }) => Promise<any>
export type ApiBody<F extends BodiedFunc> =
  F extends (body: infer F, opt: { headers?: { Authorization?: string }, params: any }) => Promise<any>
    ? F : never
export type BodiedOpt<F extends BodiedFunc> =
  F extends (body: any, opt: infer F) => Promise<any>
    ? F : never
export type BodiedParams<F extends BodiedFunc> = BodiedOpt<F>["params"]
export type BodiedParamsLessOpt<F extends BodiedFunc> = Omit<BodiedOpt<F>, "params">


export type BodyLessFunc = (opt: { headers?: { Authorization?: string }, params: any }) => Promise<any>
export type BodyLessOpt<F extends BodyLessFunc> =
  F extends (opt: infer F) => Promise<any>
    ? F : never
export type BodyLessParams<F extends BodyLessFunc> = BodyLessOpt<F>["params"]
export type BodyLessParamsLessOpt<F extends BodyLessFunc> = Omit<BodyLessOpt<F>, "params">


export type Res<F extends BodiedFunc | BodyLessFunc> =
  F extends (...args: any) => Promise<infer F>
    ? F : never

export class Client {

  async unAuthBody<F extends BodiedFunc>(
    func: F, opt: BodiedParamsLessOpt<F>, body: ApiBody<F>, params: BodiedParams<F> 
  ): Promise<Result<Res<F>>> {
    return await func(body, {...opt, params: params}).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

  async unAuth<F extends BodyLessFunc>(
    func: F, opt: BodyLessParamsLessOpt<F>, params: BodyLessParams<F> 
  ): Promise<Result<Res<F>>> {
    return await func({...opt, params: params}).then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
  }

}
