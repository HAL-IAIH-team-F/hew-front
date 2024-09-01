"use client"
import * as React from "react";
import {createContext, DetailedHTMLProps, FormHTMLAttributes, useState} from "react";
import {ErrorMessage} from "../err/ErrorMessage";
import {sx} from "../util";


export namespace FormState {
  export const Context = createContext<FormError | undefined>(undefined)

  export function error(error: FormError) {
    // return json(error)
  }
}

export type FormError = { [key: string]: string }

export function StyledForm(
  {
    action,
    children,
    className,
    ...props
  }: FormProps,
) {
  const [formError, setFormError] = useState<FormError>()

  return (
    <FormState.Context.Provider
      value={formError}
    >
      <form className={sx(className, "")} {...props} action={formData => {
        action && action(formData).then(value => {
          setFormError(value)
        })
      }}>
        <ErrorMessage error={formError && formError["form"]}/>
        {children}
        <ErrorMessage error={formError && formError["form"]}/>
      </form>
    </FormState.Context.Provider>
  )
}

export interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  action?: (formData: FormData) => Promise<FormError | undefined>
}
