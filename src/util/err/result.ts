import {util} from "../util";
import {Err, ErrorData} from "./err";
import {ErrId} from "./errorIds";

export type ApiResult<T> = SuccessResult<T> | ErrResult

export interface SuccessResult<T> {
  value: T;
  error?: undefined;
}

export interface ErrResult {
  value?: undefined;
  error: ErrorData;
}

export namespace Results {
  export function errResultByErrIdReason(errorId: ErrId, reason: any): ErrResult {
    return errResultByErrorData(errorId.createData(util.createErrorMessage(reason)));
  }

  export function errResultByErrorData(errorData: ErrorData): ErrResult {
    return {error: errorData}
  }

  export function errResultByReason(reason: any, errId: ErrId): ErrResult {
    const data = Err.errDataByAxiosErr(reason)

    if (data) return errResultByErrorData(data)
    return errResultByErrIdReason(errId, reason)
  }

  export function createSuccessResult<T>(value: T): SuccessResult<T> {
    return {value: value};
  }
}