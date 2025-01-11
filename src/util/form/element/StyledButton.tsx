import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {sx} from "../../util";
import {useFormState} from "./StyledForm";
import FormErrMsg from "../FormErrMsg";

export function StyledButton(
  {
    onClick,
    className,
    type,
    ...props
  }: StyledButtonProps,
) {
  const formState = useFormState()

  return (
    <>
        <div className={sx("flex justify-center items-center", className)}>
          <button
            className={sx("border-2 rounded-2xl py-1 px-5 bg-white hover:bg-lightGray", className)}
            {...props} disabled={formState.disabled} type={type}
          />
          <FormErrMsg name={type || "submit"}/>
        </div>
    </>
  )
}

export interface StyledButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}
