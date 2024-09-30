import {ErrorRes} from "./errorRes";
import axios, {AxiosResponse} from "axios";


export interface ErrorData {
  error_id: string;
  message: string;
}

export namespace Err {
  export function createErrorData(errorRes: ErrorRes): ErrorData {
    return {error_id: errorRes.error_id, message: errorRes.message}
  }

  export function errDataByAxiosErr(reason: any) {
    if (!axios.isAxiosError(reason)) return undefined
    const res: AxiosResponse<ErrorRes> | undefined = reason.response
    if (!res) return undefined
    return Err.createErrorData(res.data)
  }
}