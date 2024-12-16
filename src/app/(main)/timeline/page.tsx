// page.tsx
"use client";

import Main from "~/Main";
import Timeline from "./timeline";
import Sidebar from "~/Sidebar/Sidebar"

export default function Page({}: {}) {
  return (
    <Main>
      <Timeline/>
      <Sidebar/>
    </Main>
  );
}
