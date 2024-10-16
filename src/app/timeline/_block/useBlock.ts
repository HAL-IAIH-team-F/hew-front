import {useEffect} from "react";
import {createBlockState, SheetStates} from "@/timeline/_sheet/useSheet";
import {Random} from "../../../util/random";
import {ExtendBlock} from "@/timeline/_block/extendBlock";
import {Blocks} from "@/timeline/_block/Blocks";

export function useBlock(sheet: SheetStates) {
  useEffect(() => {
    const timeout = setTimeout(() => sheet.setBlocks(prev => {
        for (const block of prev) {
          const newBlock = Blocks.randomBlock();
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
            Blocks.randomBlock(), (sheet.height / 2) - sheet.offsetY, (sheet.width / 2) - sheet.offsetX,
          ));
        return newBlocks;
      }), 20,
    );
    return () => clearTimeout(timeout);
  }, [sheet.offsetY, sheet.offsetX]);
}