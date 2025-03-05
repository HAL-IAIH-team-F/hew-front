import {useWindowSize, WindowSize} from "@/_hook/useWindowSize";
import {useMemo} from "react";

export const TABLET_WIDTH = 1270;
export const PHONE_WIDTH = 720;

export default function useResponsive(): Responsive {
  const size = useWindowSize()
  return useMemo(() => {
    if (size.width < PHONE_WIDTH) return {type: "phone", windowSize: size}
    if (size.width < TABLET_WIDTH) return {type: "tablet", windowSize: size}
    return {type: "pc", windowSize: size}
  }, [size.width])
}

export interface Responsive {
  type: "phone" | "tablet" | "pc"
  windowSize: WindowSize
}