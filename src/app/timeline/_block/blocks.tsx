import {Sample1} from "@/timeline/_block/yamada_section1/page";
import {ReactNode} from "react";
import {Block} from "@/timeline/_block/block";
import {Random} from "../../../util/random";


export function randomBlock(): Block {
    return Random.randomItem(blocks)();
}

 const blocks: (() => Block)[] = [
    () => new Sample(),
    () => new Sample1(),
] as const;


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
        >
        </div>;
    }
}
