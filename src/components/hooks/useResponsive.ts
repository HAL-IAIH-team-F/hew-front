import {useWindowSize} from "@/_hook/useWindowSize";

export const TABLET_WIDTH = 1270;
export const PHONE_WIDTH = 720;

export default function useResponsive() {
  const size = useWindowSize()
  if (size.width < PHONE_WIDTH) return "phone"
  if (size.width < TABLET_WIDTH) return "tablet"
  return "pc"
}