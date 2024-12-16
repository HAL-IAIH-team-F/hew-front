// page.tsx
"use client";

import Main from "~/Main";
import Timeline from "./timeline";
import Sidebar from "~/Sidebar/Sidebar"
import { useMemo } from "react";
import { Manager } from "../../components/manager/manager";

export default function Page({}: {}) {
  const manager = useMemo(() => new Manager(), []);
  return (
    <Main>
      <Timeline manager={manager}/>
      <Sidebar manager={manager}/>
    </Main>
  );
}
