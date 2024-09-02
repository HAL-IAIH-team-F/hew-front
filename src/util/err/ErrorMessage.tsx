import {HTMLAttributes} from "react";

export interface ErrorMessageProps extends HTMLAttributes<any> {
  error?: string | undefined;
}

export function ErrorMessage(props: ErrorMessageProps) {
  const {
    error,
    className,
    ...parentProps
  } = props;
  return error &&
    <p {...parentProps} className={className + " block"}>
      <strong color={"error"}>Error: {error}</strong>
    </p>;
}