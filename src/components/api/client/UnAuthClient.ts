import {LoadedClient} from "~/api/client/LoadedClient";
import {Result} from "../../../util/err/result";
import {
  ApiBody,
  BodiedFunc,
  BodiedParams,
  BodiedParamsLessOpt,
  BodyLessFunc,
  BodyLessParams,
  BodyLessParamsLessOpt,
  Res
} from "./Client";

export class UnAuthClient extends LoadedClient {
  unAuthOrAuthBody<F extends BodiedFunc>(
    func: F, opt: BodiedParamsLessOpt<F>, body: ApiBody<F>, params: BodiedParams<F> 
  ): Promise<Result<Res<F>>> {
    return this.unAuthBody(func, opt, body, params)
  }

  unAuthOrAuth<F extends BodyLessFunc>(
    func: F, opt: BodyLessParamsLessOpt<F>, params: BodyLessParams<F> 
  ): Promise<Result<Res<F>>> {
    return this.unAuth(func, opt, params)
  }


}