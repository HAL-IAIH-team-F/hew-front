import {ErrorId} from "./errors";
import {util} from "../util";

export type ApiResult<T> = SuccessResult<T> | ErrorResult

export interface SuccessResult<T> {
  value: T;
  error?: undefined;
}

export interface ErrorResult {
  value?: undefined;
  error: ErrorData;
}

export interface ErrorData {
  error_id: string;
  message: string;
}

export namespace Results {
  export function createErrorResult(errorId: ErrorId, reason: any): ErrorResult {
    return {error: errorId.createData(util.createErrorMessage(reason))};
  }

}