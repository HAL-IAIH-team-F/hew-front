// page.tsx
"use client";

import Main from "~/Main";
import Timeline from "./timeline";
import { MouseTrail } from "./effects/mouse/mouseTrail";
import SearchButton from "~/SearchButton";
import ProductListingButton from "~/ProductListingButton";
import AccountInfo from "~/AccountInfo";
import Sidebar from "~/Sidebar/Sidebar"

export default function Page({}: {}) {
  return (
      <Main>
        <Timeline />
        <Sidebar />
      </Main>
  );
}
