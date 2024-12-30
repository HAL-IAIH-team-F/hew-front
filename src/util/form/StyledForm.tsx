"use client"
import * as React from "react";
import {createContext, ReactNode, useState} from "react";
import {sx} from "../util";
import FormErrList from "./FormErrList";
import {StyledFormData} from "./StyledFormData";


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
  const [formError, setFormError] = useState<FormError | undefined>()

  return (
    <FormState.Context.Provider
      value={formError}
    >
      <form className={sx(className, "")} {...props} action={formData => {
        setFormError(undefined)
        const styledData = new StyledFormData(formData)
        action && action(styledData).then(_ => {
          setFormError(styledData.formError)
        }).catch(reason => {
          styledData.append("submit", reason.toString())
        })
      }}>
        <FormErrList formError={formError}/>
        {children}
        <FormErrList formError={formError}/>
      </form>
    </FormState.Context.Provider>
  )
}

export interface FormProps {
  action?: (formData: StyledFormData) => Promise<void>
  children?: ReactNode
  className?: string
}
