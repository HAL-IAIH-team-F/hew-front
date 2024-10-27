// page.tsx
"use client";

import Main from "~/Main";
import Timeline from "./timeline";
import { MouseTrail } from "./effects/mouse/mouseTrail";
import Overlay from "./effects/overlay/overlay";

export default function Page({}: {}) {
  return (
    <div className="mainContainer">
      <Main>
        <Timeline />
        <MouseTrail />
        <Overlay/>
      </Main>
    </div>
  );
}
