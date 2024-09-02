import {useEffect} from "react";
import {createBlockState, SheetStates} from "@/timeline/sheet/useSheet";
import {Block} from "@/timeline/block/block";
import {Random} from "../../../util/random";
import {ExtendBlock} from "@/timeline/block/extendBlock";

export function useBlock(sheet: SheetStates) {
  useEffect(() => {
    const timeout = setTimeout(() => sheet.setBlocks(prev => {
        for (const block of prev) {
          const newBlock = Block.randomBlock();
          const start = Random.randomLessThen(ExtendBlock.durationFunc.length);
          for (let i = start; i < start + 4; i++) {
            const blockState = ExtendBlock.durationFunc[i % 4](block, newBlock, sheet, prev);
            if (blockState == undefined) continue;
            return [blockState, ...prev];
          }
        }
        return prev;
      }), 25,
    );
    return () => clearTimeout(timeout);
  }, [sheet.offsetX, sheet.offsetY, sheet.blocks]);
  useEffect(() => {
    const timeout = setTimeout(() => sheet.setBlocks(prev => {
        const newBlocks = prev.filter(value => !ExtendBlock.isOverFlowState(sheet, value));
        if (newBlocks.length == 0)
          newBlocks.push(createBlockState(
            Block.randomBlock(), (sheet.height / 2) - sheet.offsetY, (sheet.width / 2) - sheet.offsetX,
          ));
        return newBlocks;
      }), 20,
    );
    return () => clearTimeout(timeout);
  }, [sheet.offsetY, sheet.offsetX]);
}