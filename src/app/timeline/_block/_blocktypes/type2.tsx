import {ReactNode} from "react";
import Booktype2 from "@/timeline/Bookshelf/Booktype2";
import {Block} from "@/timeline/_block/block";

export class Sample2 extends Block {
  height = 500;
  width = 500;
  padTop = 0;
  padDown = 0;
  padLeft = 0;
  padRight = 0;
  private readonly selectedBookType: ReactNode;

  constructor() {
    super();
  }

  node({top, left}: { top: number, left: number }): ReactNode {
    return (
      <div
        className={"absolute h-[500px] w-[500px] bg-white shadow box-border border-2 border-black flex items-center justify-center overflow-hidden"}
        style={{
          left,
          top,
        }}
      ><span><Booktype2/></span>
      </div>
    );
  }
}
