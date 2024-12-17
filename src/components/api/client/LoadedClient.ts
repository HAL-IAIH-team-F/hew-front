import {Client} from "~/api/client/Client";
import {AxiosRequestConfig} from "axios";
import {Result} from "../../../util/err/result";

export abstract class LoadedClient extends Client {

  abstract unAuthOrAuthBody<B, R>(func: (body: B, opt: AxiosRequestConfig) => Promise<R>, body: B, opt?: AxiosRequestConfig): Promise<Result<R>>

  async unAuthOrAuth<R>(func: (opt: AxiosRequestConfig) => Promise<R>, opt?: AxiosRequestConfig): Promise<Result<R>> {
    return this.unAuthOrAuthBody((_, opt1) => func(opt1), null, opt)
  }

}