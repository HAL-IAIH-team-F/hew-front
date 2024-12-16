import {LoadedClient} from "~/api/client/LoadedClient";
import {AxiosRequestConfig} from "axios";
import {Result} from "../../../util/err/result";

export class UnAuthClient extends LoadedClient {
  async unAuthOrAuthBody<B, R>(
    func: (body: B, opt: AxiosRequestConfig) => Promise<R>, body: B, opt?: AxiosRequestConfig
  ): Promise<Result<R>> {
    return await this.unAuthBody(func, body, opt)
  }

}