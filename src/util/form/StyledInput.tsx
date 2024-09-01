"use client"
import {DetailedHTMLProps, InputHTMLAttributes, useContext} from "react";
import {FormState} from "./StyledForm";
import {ErrorMessage} from "../err/ErrorMessage";

export function StyledInput(
  {
    name,
    ...props
  }: TextInputProps
) {
  const formState = useContext(FormState.Context)
  return (
    <>
      <ErrorMessage error={name && formState && formState[name]}/>
      <input
        {...props}
        name={name}
      />
    </>
  );
}

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
}
