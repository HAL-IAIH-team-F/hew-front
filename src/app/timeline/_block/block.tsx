import { ReactNode } from "react";

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


}
