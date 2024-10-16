import {DetailedHTMLProps, HTMLAttributes} from "react";
import {sx} from "../util/util";

export default function Main(
  {
    children,
    className,
    ...props
  }: MainProps,
) {


  return (
    <main {...props} className={sx(className)}>
      {children}
    </main>
  )
}

export interface MainProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
}

 