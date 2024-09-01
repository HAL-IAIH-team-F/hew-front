import * as React from "react";
import {createContext, ReactNode} from "react";
import {ErrorMessage} from "../err/ErrorMessage";


export namespace FormState {
  export const Context = createContext<FormError | undefined>(undefined)

  export function error(error: FormError) {
    // return json(error)
  }
}

export type FormError = { [key: string]: string }

export function StyledForm(
  {
    formError,
    ...props
  }: FormProps,
) {

  return (
    <FormState.Context.Provider
      value={formError}
    >
      <ErrorMessage error={formError && formError["form"]}/>
      <Form method={"POST"} {...props}/>
      <ErrorMessage error={formError && formError["form"]}/>
    </FormState.Context.Provider>
  )
}

export interface FormProps {
  children?: ReactNode
  formError: FormError | undefined
}
