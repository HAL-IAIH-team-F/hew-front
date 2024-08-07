"use client";
import {useWindowSize} from "@/app/_hook/useWindowSize";
import {useTopScroll} from "@/app/_hook/useTopScroll";
import {useEffect, useRef, useState} from "react";
import {TimelineExtender} from "@/app/timeline/extend";

const margin = 100;
let aaa = 0
export default function Page(
  {}: {},
) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const windowSize = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useTopScroll(ref);

  useEffect(() => {
    if (windowSize.height > height) setHeight(windowSize.height);
    if (windowSize.width > width) setWidth(windowSize.width);
    if (scroll.top < margin)
      TimelineExtender.extendTop(ref.current, scroll, margin, setHeight, setOffsetY, windowSize, height);
    if (scroll.top + windowSize.height + margin > height)
      TimelineExtender.extendBottom(setHeight, margin, windowSize, height, ref.current, scroll, setOffsetY);
    if (scroll.left < margin)
      TimelineExtender.extendLeft(ref.current, scroll, margin, setWidth, setOffsetX, windowSize, width);
    if (scroll.left + windowSize.width + margin > width)
      TimelineExtender.extendRight(setWidth, margin, windowSize, width, ref.current, scroll, setOffsetX);
  }, [windowSize, scroll]);
  console.debug("width: ", width);
  console.debug("height: ", height);
  console.debug("windowSize: ", windowSize);
  console.debug("scroll: ", scroll);
  return <div
    ref={ref}
    className={"w-[100vw] h-[100vh] overflow-scroll"}
  >
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className={"relative"}
    >
      <div className={"h-10 w-10 bg-blue absolute"} style={{top: offsetY, left: offsetX}}>
        {aaa }
      </div>
    </div>
  </div>;
}