import {BlockState, createBlockState, SheetStates} from "@/timeline/_sheet/useSheet";
import {Block} from "@/timeline/_block/block";
import {Random} from "../../../util/random";

const maxDistance = 40;

export namespace ExtendBlock {
  export const durationFunc = [
    (current: BlockState, newBlock: Block, sheet: SheetStates, prev: BlockState[]) => {
      const down = current.top + current.block.padTop
        - Random.randomInt(current.block.padTop + maxDistance);
      const top = down - newBlock.height;
      const left = current.left - newBlock.width + Random.randomInt(newBlock.width + current.block.width);
      const right = left + newBlock.width;
      return create(sheet, top, down, left, right, prev, newBlock);
    },
    (current: BlockState, newBlock: Block, sheet: SheetStates, prev: BlockState[]) => {
      const top = current.top + current.block.height - current.block.padDown
        + Random.randomInt(current.block.padDown + maxDistance);
      const down = top + newBlock.height;
      const left = current.left - newBlock.width + Random.randomInt(newBlock.width + current.block.width);
      const right = left + newBlock.width;
      return create(sheet, top, down, left, right, prev, newBlock);
    },
    (current: BlockState, newBlock: Block, sheet: SheetStates, prev: BlockState[]) => {
      const right = current.left + current.block.padLeft
        - Random.randomInt(current.block.padLeft + maxDistance);
      const left = right - newBlock.width;
      const top = current.top - newBlock.height + Random.randomInt(newBlock.height + current.block.height);
      const down = top + newBlock.height;
      return create(sheet, top, down, left, right, prev, newBlock);
    },
    (current: BlockState, newBlock: Block, sheet: SheetStates, prev: BlockState[]) => {
      const left = current.left + current.block.width - current.block.padRight
        + Random.randomInt(current.block.padRight + maxDistance);
      const right = left + newBlock.width;
      const top = current.top - newBlock.height + Random.randomInt(newBlock.height + current.block.height);
      const down = top + newBlock.height;
      return create(sheet, top, down, left, right, prev, newBlock);
    },
  ];

  function create(
    sheet: SheetStates,
    top: number, down: number, left: number, right: number,
    prev: BlockState[], newBlock: Block,
  ) {
    if (checkOverflow(sheet, top, down, left, right)) return undefined;
    for (const block of prev) {
      if (checkOverlapX(block, left, right) && checkOverlapY(block, top, down)) return undefined;
    }
    return createBlockState(newBlock, top, left);
  }

  export function isOverFlowState(sheet: SheetStates, blockState: BlockState) {
    return checkOverflow(
      sheet, blockState.top, blockState.top + blockState.block.height,
      blockState.left, blockState.left + blockState.block.width,
    );
  }

  function checkOverflow(
    sheet: SheetStates, top: number, down: number, left: number, right: number,
  ) {
    if (sheet.yShaft.offset + down < 0) return true;
    if (sheet.yShaft.offset + top > sheet.yShaft.size) return true;
    if (sheet.xShaft.offset + right < 0) return true;
    return sheet.xShaft.offset + left > sheet.xShaft.size;

  }

  function checkOverlapY(currentBlock: BlockState, top: number, down: number) {
    const currentTop = currentBlock.top + currentBlock.block.padTop;
    const currentDown = currentBlock.top + currentBlock.block.height - currentBlock.block.padDown;
    if (top <= currentTop && down >= currentDown) return true;
    if (top >= currentTop && down <= currentDown) return true;
    if (currentTop < top && currentDown > top) return true;
    return currentTop < down && currentDown > down;
  }

  function checkOverlapX(currentBlock: BlockState, left: number, right: number) {
    const currentLeft = currentBlock.left + currentBlock.block.padLeft;
    const currentRight = currentBlock.left + currentBlock.block.width - currentBlock.block.padRight;
    if (left <= currentLeft && right >= currentRight) return true;
    if (left >= currentLeft && right <= currentRight) return true;
    if (currentLeft < left && currentRight > left) return true;
    return currentLeft < right && currentRight > right;
  }
}
