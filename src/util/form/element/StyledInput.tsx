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
      <div className="flex justify-center items-center ">
        <ItemBackground
            type={"label"}
            className={sx("p-3 block  w-7/12"
            )}
        >
          <p className={sx("px-4 mb-4 block text-xl text-[#4E5861]")}>
              {label || name}
          </p>
          <input
            {...props}
            name={name}
            className={sx(
                "block w-full rounded-lg px-3 py-1"
            )}
          />
          <ErrorMessage error={name && formState.err && formState.err[name]}/>
        </ItemBackground>
      </div>
  );
}

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  label?: string
}
