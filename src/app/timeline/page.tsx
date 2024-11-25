// page.tsx
"use client";

import Main from "~/Main";
import Timeline from "./timeline";
import { MouseTrail } from "./effects/mouse/mouseTrail";
import SearchButton from "~/SearchButton";
import ProductListingButton from "~/ProductListingButton";

export default function Page({}: {}) {
  return (
    <div className="mainContainer">
      <Main>
        <Timeline />
        <MouseTrail />
        <SearchButton/>
        <ProductListingButton />
      </Main>
    </div>
  );
}
