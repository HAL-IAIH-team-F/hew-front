import {ReactNode} from "react";
import {Random} from "@/app/_util/random";

let id = 0;

export abstract class Block {
  readonly abstract height: number;
  readonly abstract width: number;
  readonly abstract padTop: number;
  readonly abstract padDown: number;
  readonly abstract padLeft: number;
  readonly abstract padRight: number;
  readonly id: number;

  abstract node(top: number, left: number): ReactNode;

  constructor() {
    id++;
    this.id = id;
  }

  static readonly blocks: (() => Block)[] = [
    () => new Sample(),
  ] as const;

  static randomBlock(): Block {
    return Random.randomItem(this.blocks)();
  }
}

class Sample extends Block {
  height = 500;
  width = 500;
  padTop = 0;
  padDown = 0;
  padLeft = 0;
  padRight = 0;

  node(top: number, left: number): ReactNode {
    return <div
      key={this.id} className={"absolute h-[500px] w-[500px] bg-white shadow box-border border-2 border-black"}
      style={{
        left,
        top,
      }}
    ></div>;
  }
}
