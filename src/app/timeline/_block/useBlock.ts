import {useEffect} from "react";
import {createBlockState, SheetStates} from "@/timeline/_sheet/useSheet";
import {ExtendBlock} from "@/timeline/_block/extendBlock";
import {Blocks} from "@/timeline/_block/Blocks";
import {Random} from "../../../util/random";

export function useBlock(sheet: SheetStates) {
  console.log(sheet.yShaft.offset,sheet.yShaft.size)
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
      }), 30,
    );
    return () => clearTimeout(timeout);
  }, [sheet.xShaft.offset, sheet.yShaft.offset, sheet.blocks]);
  useEffect(() => {
    const timeout = setTimeout(() => sheet.setBlocks(prev => {
        const newBlocks = prev.filter(value => !ExtendBlock.isOverFlowState(sheet, value));
        if (newBlocks.length == 0)
          newBlocks.push(createBlockState(
            Blocks.randomBlock(), (sheet.yShaft.size / 2) - sheet.yShaft.offset, (sheet.xShaft.size / 2) - sheet.xShaft.offset,
          ));
        return newBlocks;
      }), 25,
    );
    return () => clearTimeout(timeout);
  }, [sheet.yShaft.offset, sheet.xShaft.offset]);
}