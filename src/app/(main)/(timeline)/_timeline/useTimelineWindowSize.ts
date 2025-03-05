import useResponsive, {Responsive} from "~/hooks/useResponsive";
import {useMemo} from "react";
import useProductId from "~/products/useProductId";

export default function useTimelineWindowSize() {
  const responsive = useResponsive()
  const productId = useProductId()
  return useMemo<TimelineWindowSizes>(() => {
    let width = responsive.windowSize.width
    let height = responsive.windowSize.height
    let left = 0
    if (responsive.type != "phone") {
      // sidebar
      width -= 110
      left += 110

      // sidebar main margin
      left += 35
      width -= 35


    }
    return {
      responsive: responsive,
      main: {
        width: responsive.windowSize.width,
        height: responsive.windowSize.height,
        left: 0,
        top: 0
      },
      right: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      }
    }
  }, [responsive]);
}

export interface TimelineWindowSizes {
  responsive: Responsive
  main: TimelineWindowSize
  right: TimelineWindowSize
}

export interface TimelineWindowSize {
  width: number,
  height: number,
  left: number,
  top: number
}