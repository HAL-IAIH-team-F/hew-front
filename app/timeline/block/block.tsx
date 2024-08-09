import {ReactNode} from "react";
import {Random} from "@/app/_util/random";

let id = 0;

export abstract class Block {
  readonly abstract height: number;
  readonly abstract width: number;
  readonly id: number;

  abstract node(offsetX: number, offsetY: number): ReactNode;

  constructor(
    readonly top: number,
    readonly left: number,
  ) {
    id++;
    this.id = id;
  }

  static readonly blocks: ((top: number, left: number) => Block)[] = [
    (top: number, left: number) => new Sample(top, left),
  ] as const;

  static randomBlock(top: number, left: number): Block {
    return Random.randomItem(this.blocks)(top, left);
  }
}

class Sample extends Block {
  height = 100;
  width = 100;

  node(offsetX: number, offsetY: number): ReactNode {
    return <div
      key={this.id} className={"absolute h-[100px] w-[100px] bg-blue"}
      style={{
        left: offsetX + this.left,
        top: offsetY + this.top,
      }}
    ></div>;
  }
}
