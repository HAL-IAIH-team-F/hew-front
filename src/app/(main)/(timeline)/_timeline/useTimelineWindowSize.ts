import useResponsive, {Responsive} from "~/hooks/useResponsive";
import {useMemo} from "react";
import useProductId from "~/products/useProductId";

const yMargin = 50
export default function useTimelineWindowSize() {
  const responsive = useResponsive()
  const productId = useProductId()
  return useMemo<TimelineWindowSizes>(() => {
    let width = responsive.windowSize.width - 30 - 30
    let height = responsive.windowSize.height - yMargin * 2
    let left = 30
    if (responsive.type != "phone") {
      // sidebar
      width -= 80
      left += 80

      // sidebar main margin
      left += 35
      width -= 35
    }
    if (responsive.type == "phone") {
      height -= 50
      width += 45
      left -= 15
    }
    if (responsive.type != "pc" && productId != undefined) {
      const rightWidth = width
      if (width > 600) width = 600
      return {
        responsive: responsive,
        main: {
          width: 0,
          height: height,
          left: left,
          top: yMargin
        },
        right: {
          width: width - 15,
          height: height,
          left: left + rightWidth - width,
          top: yMargin
        }
      }
    }
    let right: TimelineWindowSize = {
      width: 0,
      height: 0,
      left: left + width,
      top: responsive.windowSize.height / 2
    }
    if (productId != undefined) {
      let rightWidth = width * 0.3
      if (rightWidth <= 500) {
        rightWidth = 500
      }
      right.width = rightWidth - 15
      right.left = responsive.windowSize.width - right.width - 30
      right.height = height
      right.top = yMargin
      width -= rightWidth
    }

    return {
      responsive: responsive,
      main: {
        width: width - 15,
        height: height,
        left: left,
        top: yMargin
      },
      right: right
    }
  }, [responsive, productId == undefined]);
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