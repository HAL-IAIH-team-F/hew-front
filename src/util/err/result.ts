import {util} from "../util";
import {Err, ErrorData} from "./err";
import {ErrId} from "./errorIds";

export type Result<T> = SuccessResult<T> | ErrResult

export interface SuccessResult<T> {
  success: T;
  error?: undefined;
}

export interface ErrResult {
  success?: undefined;
  error: ErrorData;
}

export namespace Results {
  function errResultByErrIdReason(errorId: ErrId, reason: any): ErrResult {
    return errResultByErrorData(errorId.createData(util.createErrorMessage(reason)));
  }

  export function errResultByErrorData(errorData: ErrorData): ErrResult {
    return {error: errorData}
  }

  export function errResultByReason(reason: any, errId: ErrId): ErrResult {
    const data = Err.reasonIfAxiosErr(reason)
    if (!data) return errResultByErrIdReason(errId, reason)
    if (!data.error_id) return errResultByErrIdReason(errId, data)
    if (!data.message) return errResultByErrIdReason(errId, data)
    return errResultByErrorData(Err.createErrorData(data))
  }

  export function createSuccessResult<T>(value: T): SuccessResult<T> {
    return {success: value};
  }
}