"use client"
import {useWindowSize} from "@/app/_hook/useWindowSize";
import {useTopScroll} from "@/app/_hook/useTopScroll";
import {useEffect, useRef, useState} from "react";

const margin = 100
export default function Page(
  {}: {}
) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const windowSize = useWindowSize()
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useTopScroll(ref)

  useEffect(() => {
    if (windowSize.height > height) setHeight(windowSize.height)
    if (windowSize.width > width) setWidth(windowSize.width)
    if (scroll.top + windowSize.height + margin > height) {
      setHeight(prevState => prevState + margin)
    }
    if (scroll.top < margin) {
      ref.current?.scrollTo({top: scroll.top + margin})
      setHeight(prevState => prevState + margin)
      setOffsetY(prevState => prevState + margin)
    }
    if (scroll.left + windowSize.width + margin > width) {
      setWidth(prevState => prevState + margin)
    }
    if (scroll.left < margin) {
      ref.current?.scrollTo({left: scroll.left + margin})
      setWidth(prevState => prevState + margin)
      setOffsetX(prevState => prevState + margin)
    }
  }, [windowSize, scroll]);
  console.debug("width: ", width)
  console.debug("height: ", height)
  console.debug("windowSize: ", windowSize)
  console.debug("scroll: ", scroll)
  return <div
    ref={ref}
    className={"w-[100vw] h-[100vh] overflow-scroll"}
  >
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`
      }}
      className={"relative"}
    >
      <div className={"h-10 w-10 bg-blue absolute"} style={{top: offsetY, left: offsetX}}></div>
    </div>
  </div>
}