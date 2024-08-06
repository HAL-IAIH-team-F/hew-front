import {useMemo, useState} from "react";
import {useWindowSize} from "@/app/_hook/useWindowSize";

export default function Block(
  {
    ...props
  }: BlockProps,
) {
  return (
    <div className={"w-96 h-96 bg-blue"} >
    </div>
  )
}

export interface BlockProps {
}
