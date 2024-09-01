import {ReactNode} from "react";
import {ApiResult, SuccessResult} from "./result";
import {ErrorMessage} from "./ErrorMessage";

export function SuccessOrErrMsg<T>(
  {
    result,
    success,
  }: SuccessOrErrorProps<T>,
) {

  return (
    result.error ? <ErrorMessage error={result.error.message}/> : success(result)
  )
}

export interface SuccessOrErrorProps<T> {
  result: ApiResult<T>
  success: (result: SuccessResult<T>) => ReactNode
}
