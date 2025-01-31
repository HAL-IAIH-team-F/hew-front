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
      <button
        className={sx("border-2 border-borderDef rounded py-1 px-4 bg-white hover:bg-lightGray text-black", className)}
        {...props} disabled={formState.disabled} type={type}
      />
      <FormErrMsg name={type || "submit"}/>
    </>
  )
}

export interface StyledButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}
