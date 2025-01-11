// page.tsx
"use client";

import Main from "~/Main";
import Timeline from "./timeline";
import Sidebar from "~/Sidebar/Sidebar"
import { useMemo } from "react";
import {Manager} from "~/manager/manager";
import { ProductProvider } from "~/products/ContextProvider";
import RightProductWindows from "~/products/RightProductWindows";

export default function Page({}: {}) {
  const manager = useMemo(() => new Manager(), []);
  return (
    <ProductProvider>
      <Timeline manager={manager}/>
      <Sidebar manager={manager}/>
      <RightProductWindows/>
    </ProductProvider>
  );
}
