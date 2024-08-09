import {RefObject, useEffect, useMemo, useRef, useState} from "react";
import {TimelineExtender} from "@/app/timeline/extend";
import {useWindowSize} from "@/app/_hook/useWindowSize";
import {useTopScroll} from "@/app/_hook/useTopScroll";
import {Block} from "@/app/timeline/block/block";

const margin = 100;

export function useSheet(): SheetStates {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [blocks, setBlocks] = useState(() => [Block.randomBlock(0, 0)]);
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
  }, [windowSize, scroll, ref]);

  return useMemo(() => {
    return {
      blocks,
      ref,
      width,
      height,
      offsetX,
      offsetY,
    } as const;
  }, [blocks, ref, width, height, offsetX, offsetY]);
}

export interface SheetStates {
  blocks: Block[];
  ref: RefObject<HTMLDivElement>;
  width: number,
  height: number,
  offsetX: number,
  offsetY: number
}