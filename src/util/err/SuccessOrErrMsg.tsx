import {ReactNode} from "react";
import {Result, SuccessResult} from "./result";
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
  result: Result<T>
  success: (result: SuccessResult<T>) => ReactNode
}
