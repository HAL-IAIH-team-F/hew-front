import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {sx} from "../util";

export function StyledButton(
  {
    onClick,
    className,
    ...props
  }: StyledButtonProps,
) {


  return (
    <button
      className={sx("border-2 border-borderDef rounded py-1 px-4 bg-white hover:bg-lightGray",className)}
      {...props}
    />
  )
}

export interface StyledButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}
