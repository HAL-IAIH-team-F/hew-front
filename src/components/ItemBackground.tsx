import {ClassAttributes, createElement, HTMLAttributes, ReactHTML} from "react";
import {sx} from "../util/util";

export namespace ItemBackgrounds {
  export const itemBackgroundClassName = "bg-crystal border-white border-2"
}
export default function ItemBackground<P extends HTMLAttributes<T>, T extends HTMLElement>(
  {
    type,
    className,
    ...props
  }: ItemBackgroundProps<T> & P,
) {
  return createElement(type || "div", {className: sx(ItemBackgrounds.itemBackgroundClassName, className), ...props})
}

export interface ItemBackgroundProps<T extends HTMLElement> extends ClassAttributes<T> {
  type?: keyof ReactHTML
}
