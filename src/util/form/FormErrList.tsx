import {ErrorMessage} from "../err/ErrorMessage";
import * as React from "react";
import {FormError} from "./StyledForm";

export default function FormErrList(
  {
    formError,
  }: FormErrListProps,
) {


  return (
    formError && Object.keys(formError).map(value =>
      <ErrorMessage error={value + ": " + formError[value]} key={value}/>
    )
  )
}

export interface FormErrListProps {
  formError: FormError | undefined
}

 