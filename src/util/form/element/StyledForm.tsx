"use client"
import * as React from "react";
import {createContext, ReactNode, useContext, useState} from "react";
import {sx} from "../../util";
import FormErrList from "../FormErrList";
import {StyledFormData} from "../StyledFormData";
import {FormContext} from "../FormContext";


const Context = createContext<FormContext>({
  err: undefined,
  disabled: false,
})

export function useFormState() {
  return useContext(Context)
}

export type FormError = { [key: string]: string }

export function StyledForm(
  {
    action,
    children,
    className,
    disabled = false,
    ...props
  }: FormProps,
) {
  const [formContext, setFormContext] = useState<FormContext>({err: undefined, disabled: disabled})

  return (
    <Context.Provider value={formContext}>
      <form
        className={sx(
          "bg-gray-900 text-white p-6 rounded-lg",
          disabled ? "opacity-50 cursor-not-allowed" : undefined, // ここを修正
          className
        )}
        {...props}
        action={formData => {
          setFormContext({err: undefined, disabled: disabled})
          const styledData = new StyledFormData(formData)
          action && action(styledData).then(_ => {
            setFormContext({err: styledData.formError, disabled: disabled})
          }).catch(reason => {
            styledData.append("submit", reason.toString())
          })
        }}
      >
        <FormErrList/>
        {children}
        <FormErrList/>
      </form>
    </Context.Provider>
  )
}

export interface FormProps {
  action?: (formData: StyledFormData) => Promise<void>
  children?: ReactNode
  className?: string
  disabled?: boolean
}
