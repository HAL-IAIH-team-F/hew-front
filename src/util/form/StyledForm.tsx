"use client"
import * as React from "react";
import {createContext, FormHTMLAttributes, useState} from "react";
import {ErrorMessage} from "../err/ErrorMessage";
import {sx} from "../util";


export namespace FormState {
  export const Context = createContext<FormError | undefined>(undefined)
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
        {formError && Object.keys(formError).map(value =>
          <ErrorMessage error={value + ": " + formError[value]} key={value}/>
        )}
        {children}
        {formError && Object.keys(formError).map(value =>
          <ErrorMessage error={value + ": " + formError[value]} key={value}/>
        )}
      </form>
    </FormState.Context.Provider>
  )
}

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  action?: (formData: FormData) => Promise<FormError | undefined>
}
