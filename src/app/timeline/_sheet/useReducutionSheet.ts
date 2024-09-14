import {Scroll} from "@/_hook/useTopScroll";
import {WindowSize} from "@/_hook/useWindowSize";
import {MutableRefObject, useEffect} from "react";
import {Shaft} from "@/timeline/_sheet/useSheet";

export function useReductionSheet(
  windowSize: WindowSize,
  yShaft: Shaft,
  xShaft: Shaft,
  setYShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void,
  setXShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void,
  scroll: Scroll,
  ref: MutableRefObject<HTMLDivElement | null>,
  windowSizeChangedReflectFlag: boolean,
) {
  useEffect(() => {
    // if (windowSize.height * 4 < yShaft.size - scroll.top)
    //   TimelineReduction.reductionBottom(windowSize.height, setYShaft);
    // if (windowSize.height * 3 < scroll.top)
    //   TimelineReduction.reductionTop(windowSize.height, ref.current, scroll, setYShaft);
    // if (windowSize.width * 4 < xShaft.size - scroll.left)
    //   TimelineReduction.reductionRight(windowSize.width, setXShaft);
    // if (windowSize.width * 3 < scroll.top)
    //   TimelineReduction.reductionLeft(windowSize.width, ref.current, scroll, setXShaft);
  }, [windowSize, scroll, ref, windowSizeChangedReflectFlag]);

}

export namespace TimelineReduction {

  export function reductionBottom(
    margin: number,
    setYShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void) {
    setYShaft(prevState => {
      return {
        size: prevState.size - margin,
        offset: prevState.offset
      }
    })
  }

  export const reductionTop = (
    margin: number,
    element: HTMLDivElement | null,
    scroll: Scroll,
    setYShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void) => {
    setYShaft(prevState => {
      return {
        size: prevState.size - margin,
        offset: prevState.offset - margin
      }
    })
    element?.scrollTo({top: scroll.top - margin});
  };

  export function reductionRight(
    margin: number,
    setXShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void) {
    setXShaft(prevState => {
      return {
        size: prevState.size - margin,
        offset: prevState.offset
      }
    })
  }

  export function reductionLeft(
    margin: number,
    element: HTMLDivElement | null,
    scroll: Scroll,
    setXShaft: (value: (((prevState: Shaft) => Shaft) | Shaft)) => void) {
    setXShaft(prevState => {
      return {
        size: prevState.size - margin,
        offset: prevState.offset - margin
      }
    })
    element?.scrollTo({left: scroll.left - margin});
  }
}