import {
  ApiBody,
  BodiedFunc,
  BodiedParams,
  BodiedParamsLessOpt,
  BodyLessFunc,
  BodyLessParams,
  BodyLessParamsLessOpt,
  Client,
  Res
} from "~/api/client/Client";
import {Result} from "../../../util/err/result";

export abstract class LoadedClient extends Client {

  abstract unAuthOrAuthBody<F extends BodiedFunc>(
    func: F, opt: BodiedParamsLessOpt<F>, body: ApiBody<F>, params: BodiedParams<F>
  ): Promise<Result<Res<F>>>

  abstract unAuthOrAuth<F extends BodyLessFunc>(
    func: F, opt: BodyLessParamsLessOpt<F>, params: BodyLessParams<F>
  ): Promise<Result<Res<F>>>

}