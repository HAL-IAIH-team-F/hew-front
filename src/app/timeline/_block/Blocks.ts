import {Random} from "../../../util/random";
import {Block} from "@/timeline/_block/block";
import {Sample1} from "@/timeline/_block/_blocktypes/type1";
import {Sample2} from "@/timeline/_block/_blocktypes/type2";

export namespace Blocks {
  const blocks: (() => Block)[] = [
    () => new Sample1(),
    () => new Sample2(),
  ] as const;

  export function randomBlock(): Block {
    return Random.randomItem(blocks)();
  }
}