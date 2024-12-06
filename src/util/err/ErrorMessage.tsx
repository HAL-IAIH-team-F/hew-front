import {HTMLAttributes} from "react";
import {ErrorData} from "./err";

export interface ErrorMessageProps extends HTMLAttributes<any> {
  error?: string | undefined | ErrorData;
}

export function ErrorMessage(props: ErrorMessageProps) {
  const {
    error,
    className,
    ...parentProps
  } = props;
  let errorStr: string | undefined;
  if (typeof error === "object") {
    errorStr = `${error.error_id}: {${error.message}}`
  } else errorStr = error;
  return error &&
    <p {...parentProps} className={className + " block"}>
      <strong color={"error"}>{`Error: {${errorStr}}`}</strong>
    </p>;
}