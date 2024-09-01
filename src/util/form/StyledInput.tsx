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
    ...props
  }: TextInputProps
) {
  const formState = useContext(FormState.Context)
  return (
    <ItemBackground type={"label"} className={sx("p-3", "block")}>
      <p>{label || name}</p>
      <input
        {...props}
        name={name}
      />
      <ErrorMessage error={name && formState && formState[name]}/>
    </ItemBackground>
  );
}

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  label?: string
}
