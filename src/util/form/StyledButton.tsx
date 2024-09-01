import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

export function StyledButton(
  {
    onClick,
    ...props
  }: StyledButtonProps,
) {


  return (
    <button
      {...props}
    />
  )
}

export interface StyledButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}
