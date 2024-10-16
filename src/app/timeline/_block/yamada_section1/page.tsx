import React, { ReactNode } from "react";
import { Block } from "../block";
import {Header} from "@/timeline/_block/yamada_section1/Header";


export class Sample1 extends Block {
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
    >
      <p className={"text-center"}>aaa</p>
      <Header />
    </div>;
  }
}
