import {Scroll} from "@/app/_hook/useTopScroll";
import {WindowSize} from "@/app/_hook/useWindowSize";

export namespace TimelineExtender {
  export function extendTop(
    element: HTMLDivElement | null,
    scroll: Scroll,
    margin: number,
    setHeight: (value: (((prevState: number) => number) | number)) => void,
    setOffsetY: (value: (((prevState: number) => number) | number)) => void,
    windowSize: WindowSize,
    height: number,
  ) {
    element?.scrollTo({top: scroll.top + margin});
    setHeight(prevState => prevState + margin);
    setOffsetY(prevState => prevState + margin);
    if (windowSize.height * 3 < height) {
      setHeight(prevState => prevState - margin);
    }
  }

  export function extendBottom(
    setHeight: (value: (((prevState: number) => number) | number)) => void,
    margin: number,
    windowSize: WindowSize,
    height: number,
    element: HTMLDivElement | null,
    scroll: Scroll, setOffsetY: (value: (((prevState: number) => number) | number)) => void,
  ) {
    setHeight(prevState => prevState + margin);
    if (windowSize.height * 3 < height) {
      element?.scrollTo({top: scroll.top - margin});
      setHeight(prevState => prevState - margin);
      setOffsetY(prevState => prevState - margin);
    }
  }

  export function extendLeft(
    element: HTMLDivElement | null,
    scroll: Scroll,
    margin: number,
    setWidth: (value: (((prevState: number) => number) | number)) => void,
    setOffsetX: (value: (((prevState: number) => number) | number)) => void,
    windowSize: WindowSize,
    width: number,
  ) {
    element?.scrollTo({left: scroll.left + margin});
    setWidth(prevState => prevState + margin);
    setOffsetX(prevState => prevState + margin);
    if (windowSize.width * 3 < width) {
      setWidth(prevState => prevState - margin);
    }
  }

  export function extendRight(
    setWidth: (value: (((prevState: number) => number) | number)) => void,
    margin: number,
    windowSize: WindowSize,
    width: number,
    element: HTMLDivElement | null,
    scroll: Scroll,
    setOffsetX: (value: (((prevState: number) => number) | number)) => void,
  ) {
    setWidth(prevState => prevState + margin);
    if (windowSize.width * 3 < width) {
      element?.scrollTo({left: scroll.left - margin});
      setWidth(prevState => prevState - margin);
      setOffsetX(prevState => prevState - margin);
    }
  }
}