import {ReactNode, RefObject, useEffect, useMemo, useRef, useState} from "react";
import {Block} from "@/timeline/_block/block";
import {useWindowSize} from "@/_hook/useWindowSize";
import {useTopScroll} from "@/_hook/useTopScroll";
import {TimelineExtender} from "@/timeline/_sheet/extendSheet";

export interface BlockState {
  block: Block;
  top: number;
  left: number;

  node(offsetX: number, offsetY: number): ReactNode;
}

export function createBlockState(
  block: Block,
  top: number,
  left: number,
): BlockState {
  return {
    block: block,
    top,
    left,
    node(offsetX: number, offsetY: number): ReactNode {
      return block.node(top + offsetY, left + offsetX);
    },
  };
}

export function useSheet(): SheetStates {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [blocks, setBlocks] = useState<BlockState[]>(() => [createBlockState(Block.randomBlock(), 0, 0)]);
  const windowSize = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useTopScroll(ref);
  const [windowSizeChangedReflectFlag, setWindowSizeChangedReflectFlag] = useState(false);
  useEffect(() => {
    if (windowSize.height > height) {
      setHeight(prevState => prevState + windowSize.height);
      setWindowSizeChangedReflectFlag(!windowSizeChangedReflectFlag);
    }
    if (windowSize.width > width) {
      setWidth(prevState => prevState + windowSize.width);
      setWindowSizeChangedReflectFlag(!windowSizeChangedReflectFlag);
    }
  }, [windowSize]);

  useEffect(() => {
    if (scroll.top < windowSize.height)
      TimelineExtender.extendTop(ref.current, scroll, windowSize.height, setHeight, setOffsetY, windowSize, height);
    if (scroll.top + windowSize.height * 2 > height)
      TimelineExtender.extendBottom(setHeight, windowSize.height, windowSize, height, ref.current, scroll, setOffsetY);
    if (scroll.left < windowSize.width)
      TimelineExtender.extendLeft(ref.current, scroll, windowSize.width, setWidth, setOffsetX, windowSize, width);
    if (scroll.left + windowSize.width * 2 > width)
      TimelineExtender.extendRight(setWidth, windowSize.width, windowSize, width, ref.current, scroll, setOffsetX);
  }, [windowSize, scroll, ref, windowSizeChangedReflectFlag]);

  return useMemo(() => {
    return {
      blocks,
      ref,
      width,
      height,
      offsetX,
      offsetY,
      setBlocks: setBlocks,
    } as const;
  }, [blocks, ref, width, height, offsetX, offsetY]);
}

export interface SheetStates {
  blocks: BlockState[];
  ref: RefObject<HTMLDivElement>;
  width: number,
  height: number,
  offsetX: number,
  offsetY: number,
  setBlocks: (fun: (prev: BlockState[]) => BlockState[]) => void
}