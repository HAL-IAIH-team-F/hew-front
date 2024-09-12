"use client"
import {DetailedHTMLProps, InputHTMLAttributes, useContext} from "react";
import {FormState} from "./StyledForm";
import {ErrorMessage} from "../err/ErrorMessage";
import ItemBackground from "~/ItemBackground";
import {sx} from "../util";

export function StyledInput(
  {
    name,
    label,
    className,
    ...props
  }: TextInputProps
) {
  const formState = useContext(FormState.Context)
  return (
    <ItemBackground type={"label"} className={sx("p-3 block my-6", className)}>
      <p className={sx("px-4 mb-4 block text-xl")}>{label || name}</p>
      <input
        {...props}
        name={name} className={sx("block w-full border-2 border-borderDef rounded-lg px-3 py-1 text-lg")}
      />
      <ErrorMessage error={name && formState && formState[name]}/>
    </ItemBackground>
  );
}

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  label?: string
}
