import {ErrorMessage, ErrorMessageProps} from "./ErrorMessage";

export function OrErrorMessage(
  {
    children,
    ...props
  }: OrErrorMessageProps,
) {
  return (
    props.error?<ErrorMessage {...props}/> : children
  )
}

export interface OrErrorMessageProps extends ErrorMessageProps {
}
