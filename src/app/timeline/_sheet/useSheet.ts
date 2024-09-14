import {ReactNode, RefObject, useEffect, useMemo, useRef, useState} from "react";
import {Block} from "@/timeline/_block/block";
import {useWindowSize} from "@/_hook/useWindowSize";
import {useTopScroll} from "@/_hook/useTopScroll";
import {useExtendSheet} from "@/timeline/_sheet/useExtendSheet";
import {Blocks} from "@/timeline/_block/Blocks";
import {useReductionSheet} from "@/timeline/_sheet/useReducutionSheet";

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
      return block.component(top + offsetY, left + offsetX);
    },
  };
}

export interface Shaft {
  size: number
  offset: number
}

export function useSheet(): SheetStates {
  const [xShaft, setXShaft] = useState<Shaft>({size: 1000, offset: 0})
  const [yShaft, setYShaft] = useState<Shaft>({size: 1000, offset: 0})
  const [blocks, setBlocks] = useState<BlockState[]>(() => [createBlockState(Blocks.randomBlock(), 0, 0)]);
  const windowSize = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useTopScroll(ref);
  const [windowSizeChangedReflectFlag, setWindowSizeChangedReflectFlag] = useState(false);
  useEffect(() => {
    if (windowSize.height > yShaft.size) {
      setYShaft(prevState => {
        return {
          size: prevState.size + windowSize.height,
          offset: prevState.offset
        }
      });
    }
    if (windowSize.width > xShaft.size) {
      setYShaft(prevState => {
        return {
          size: prevState.size + windowSize.width,
          offset: prevState.offset
        }
      });
    }
    setWindowSizeChangedReflectFlag(!windowSizeChangedReflectFlag);
  }, [windowSize]);
  useExtendSheet(scroll, windowSize, ref, yShaft, xShaft, setYShaft, setXShaft, windowSizeChangedReflectFlag)
  useReductionSheet(windowSize, yShaft, xShaft, setYShaft, setXShaft, scroll, ref, windowSizeChangedReflectFlag)

  return useMemo(() => {
    return {
      blocks,
      ref,
      yShaft,
      xShaft,
      setBlocks: setBlocks,
    } as const;
  }, [blocks, ref, yShaft, xShaft]);
}

export interface SheetStates {
  blocks: BlockState[];
  ref: RefObject<HTMLDivElement>;
  yShaft: Shaft
  xShaft: Shaft
  setBlocks: (fun: (prev: BlockState[]) => BlockState[]) => void
}