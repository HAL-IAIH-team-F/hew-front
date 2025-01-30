import {MouseEventHandler} from "react";
import {sx} from "../../../../../util/util";

export default function CloseButton(
  {
    ...props
  }: {
    onClick?: MouseEventHandler | undefined;
  },
) {
  const barClass = "absolute h-[2px] w-full bg-gray-600 left-0"

  return (
    <button
      type="button"
      className={"relative w-[20px] h-[20px]"} {...props}
    >
      <div className={sx(barClass, "rotate-45")}/>
      <div className={sx(barClass, "-rotate-45")}/>
    </button>
  )
}
