import {DetailedHTMLProps, HTMLAttributes} from "react";
import {sx} from "./util";

export default function FlexBox(
  {
    children,
    className,
    ...props
  }: FlexBoxProps,
) {


  return (
    <div {...props} className={sx("flex", className)}>
      {children}
    </div>
  )
}

export interface FlexBoxProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

 