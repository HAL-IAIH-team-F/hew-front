import {HTMLAttributes} from "react";
import {Property} from "csstype";

export interface ErrorMessageProps extends HTMLAttributes<any> {
  error?: string | undefined;
  width?: Property.Width<string | number> | undefined;
  flex?: Property.Flex<string | number> | undefined;
}

export function ErrorMessage(props: ErrorMessageProps) {
  const {
    width,
    error,
    flex,
    ...parentProps
  } = props;
  return error && <p {...parentProps} className={"block flex-auto"}>
    <strong color={"error"}>Error: {error}</strong>
  </p>;
}