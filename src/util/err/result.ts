import {util} from "../util";
import {ErrorData} from "./err";
import {ErrorId} from "./errorIds";

export type ApiResult<T> = SuccessResult<T> | ErrorResult

export interface SuccessResult<T> {
  value: T;
  error?: undefined;
}

export interface ErrorResult {
  value?: undefined;
  error: ErrorData;
}

export namespace Results {
  export function errorResultByErrIdReason(errorId: ErrorId, reason: any): ErrorResult {
    return errorResByErrorData(errorId.createData(util.createErrorMessage(reason)));
  }

  export function errorResByErrorData(errorData: ErrorData): ErrorResult {
    return {error: errorData}
  }

  export function createSuccessResult<T>(value: T): SuccessResult<T> {
    return {value: value};
  }
}