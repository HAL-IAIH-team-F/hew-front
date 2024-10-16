import {ReactNode} from "react";

export let id = 0;

export abstract class Block {
  readonly abstract height: number;
  readonly abstract width: number;
  readonly abstract padTop: number;
  readonly abstract padDown: number;
  readonly abstract padLeft: number;
  readonly abstract padRight: number;
  readonly id: number;

  protected abstract node({top, left}: { top: number, left: number }): ReactNode;

  component(top: number, left: number) {
    const Node = this.node
    return <Node key={this.id} top={top} left={left}/>
  }

  protected constructor() {
    id++;
    this.id = id;
  }

}
