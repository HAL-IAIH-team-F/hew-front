"use client";

import {useBlock} from "@/timeline/_block/useBlock";
import {useSheet} from "@/timeline/_sheet/useSheet";

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
        width: `${sheet.xShaft.size}px`,
        height: `${sheet.yShaft.size}px`,
      }}
      className={"relative overflow-hidden"}
    >
      {sheet.blocks.map(value => value.node(sheet.xShaft.offset, sheet.yShaft.offset))}
    </div>
  </div>;
}
