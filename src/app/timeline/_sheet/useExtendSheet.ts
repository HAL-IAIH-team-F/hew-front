import {Scroll} from "@/_hook/useTopScroll";
import {Shaft} from "@/timeline/_sheet/useSheet";
import {MutableRefObject, useEffect} from "react";
import {WindowSize} from "@/_hook/useWindowSize";

export function useExtendSheet(
  scroll: Scroll,
  windowSize: WindowSize,
  ref: MutableRefObject<HTMLDivElement | null>,
  yShaft: Shaft,
  xShaft: Shaft,
  setYShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void,
  setXShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void, windowSizeChangedReflectFlag: boolean
) {
  useEffect(() => {
    if (scroll.top < windowSize.height)
      return TimelineExtender.extendTop(ref.current, scroll, windowSize.height, setYShaft);
    if (scroll.top + windowSize.height * 2 > yShaft.size)
      return TimelineExtender.extendBottom(windowSize.height, setYShaft);
    if (scroll.left < windowSize.width)
      return TimelineExtender.extendLeft(ref.current, scroll, windowSize.width, setXShaft);
    if (scroll.left + windowSize.width * 2 > xShaft.size)
      return TimelineExtender.extendRight(windowSize.width, setXShaft);
  }, [windowSize, scroll, ref, windowSizeChangedReflectFlag]);

}

export namespace TimelineExtender {
  export function extendTop(
    element: HTMLDivElement | null,
    scroll: Scroll,
    margin: number,
    setYShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void
  ) {
    element?.scrollTo({top: scroll.top + margin});
    setYShaft(prevState => {
      return {
        size: prevState.size + margin,
        offset: prevState.offset + margin
      }
    })
  }

  export function extendBottom(
    margin: number,
    setYShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void) {
    setYShaft(prevState => {
      return {
        size: prevState.size + margin,
        offset: prevState.offset
      }
    });
  }

  export function extendLeft(
    element: HTMLDivElement | null,
    scroll: Scroll,
    margin: number,
    setXShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void
  ) {
    setXShaft(prevState => {
      return {
        size: prevState.size + margin,
        offset: prevState.offset + margin
      }
    })
    element?.scrollTo({left: scroll.left + margin});
  }

  export function extendRight(
    margin: number,
    setXShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void) {
    setXShaft(prevState => {
      return {
        size: prevState.size + margin,
        offset: prevState.offset
      }
    })
  }
}