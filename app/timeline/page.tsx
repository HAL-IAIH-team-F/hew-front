"use client";
import {useSheet} from "@/app/timeline/sheet/useSheet";
import {useBlock} from "@/app/timeline/block/useBlock";

export default function Page(
  {}: {},
) {
  const sheet = useSheet();
  useBlock(sheet);
  return <div
    ref={sheet.ref}
    className={"w-[100vw] h-[100vh] overflow-scroll"}
  >
    <div
      style={{
        width: `${sheet.width}px`,
        height: `${sheet.height}px`,
      }}
      className={"relative overflow-hidden"}
    >
      {sheet.blocks.map(value => value.node(sheet.offsetX, sheet.offsetY))}
      {/*<div className={"h-10 w-10 bg-blue absolute"} style={{top: offsetY, left: offsetX}}>*/}
      {/*</div>*/}
    </div>
  </div>;
}
