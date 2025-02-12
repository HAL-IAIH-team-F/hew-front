"use client"
import {DetailedHTMLProps, InputHTMLAttributes} from "react";
import {useFormState} from "./StyledForm";
import {ErrorMessage} from "../../err/ErrorMessage";
import ItemBackground from "~/ItemBackground";
import {sx} from "../../util";

export function StyledInput(
  {
    name,
    label,
    className,
    ...props
  }: TextInputProps
) {
  const formState = useFormState()
  return (
    <ItemBackground 
      type={"label"} 
      className={sx("p-3 block my-6 bg-gray-900 rounded-lg", className)}
    >
      <p className={sx("px-4 mb-4 block text-xl text-white")}>
        {label || name}
      </p>
      <input
        {...props}
        name={name}
        className={sx(
          "block w-full border-2 border-gray-700 rounded-lg px-3 py-1 text-lg bg-gray-800 text-white",
          "focus:ring-2 focus:ring-gray-500 focus:border-gray-500 hover:bg-gray-700 transition"
        )}
      />
      <ErrorMessage error={name && formState.err && formState.err[name]}/>
    </ItemBackground>
  );
}

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  label?: string
}
