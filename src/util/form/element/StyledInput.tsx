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
    as="input", // デフォルトはinput
    className,
    ...props
  }: TextInputProps
) {
  const formState = useFormState()
  const Component = as === "textarea" ? "textarea" : "input";
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
          <Component
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

export interface TextInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLInputElement | HTMLTextAreaElement
    > {
  name: string
  label?: string
　as?: "input" | "textarea";
}
