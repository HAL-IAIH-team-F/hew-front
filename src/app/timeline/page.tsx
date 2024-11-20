// page.tsx
"use client";

import Main from "~/Main";
import Timeline from "./timeline";
import { MouseTrail } from "./effects/mouse/mouseTrail";
import Overlay from "./effects/overlay/overlay";
import SearchButton from "~/SearchButton";

export default function Page({}: {}) {
  return (
    <div className="mainContainer">
      <Main>
        <Timeline />
        <MouseTrail />
        <SearchButton/>
        {/* <Overlay/> */}
      </Main>
    </div>
  );
}
