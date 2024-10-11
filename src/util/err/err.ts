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

  export function reasonIfAxiosErr(reason: any) {
    if (!axios.isAxiosError(reason)) return undefined
    const res: AxiosResponse<ErrorRes> | undefined = reason.response
    if (!res) return undefined
    return res.data
  }

  export function errDataIfAxiosErr(reason: any) {
    const data = reasonIfAxiosErr(reason)
    if (!data) return undefined
    if (!data.error_id) return undefined
    if (!data.message) return undefined
    return Err.createErrorData(data)
  }
}