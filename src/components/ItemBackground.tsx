import {DetailedHTMLProps, HTMLAttributes} from "react";
import {sx} from "../util/util";


export namespace ItemBackgrounds {
  export const itemBackgroundClassName = "bg-crystal border-white border-2"
}
export default function ItemBackground(
  {
    className,
    ...props
  }: ItemBackgroundProps,
) {


  return (
    <div {...props} className={sx(ItemBackgrounds.itemBackgroundClassName, className)}/>
  )
}

export interface ItemBackgroundProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}
