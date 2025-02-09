import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {sx} from "../../util";
import {useFormState} from "./StyledForm";
import FormErrMsg from "../FormErrMsg";

export function StyledButton(
  {
    className,
    type,
    ...props
  }: StyledButtonProps,
) {
  const formState = useFormState()

  return (
    <>
      <button
        className={sx(
          "border-2 border-gray-600 rounded py-1 px-4 bg-gray-800 hover:bg-gray-700 text-white",
          formState.disabled ? "opacity-50 cursor-not-allowed" : undefined, // 無効時のスタイル
          className
        )}
        {...props}
        disabled={formState.disabled}
        type={type}
      />
      <FormErrMsg name={type || "submit"}/>
    </>
  )
}

export interface StyledButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}
