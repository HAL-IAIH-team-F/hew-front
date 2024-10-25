// page_fiber.tsx
"use client";

import Main from "~/Main";
import TimelineFiber from "./timeline";
import { MouseTrail } from "./effects/mouse/mouseTrail";
import Overlay from "./effects/overlay/overlay";

export default function PageFiber() {
  return (
    <div className="mainContainer">
      <Main>
        <TimelineFiber />
        <MouseTrail />
        <Overlay />
      </Main>
    </div>
  );
}
