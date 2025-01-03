import {ErrorMessage} from "../err/ErrorMessage";
import * as React from "react";
import {useFormState} from "./element/StyledForm";

export default function FormErrList(
  {}: FormErrListProps,
) {
  const formContext = useFormState()

  const err = formContext.err
  return (
    err && Object.keys(err).map(value =>
      <ErrorMessage error={value + ": " + err[value]} key={value}/>
    )
  )
}

export interface FormErrListProps {
}

 