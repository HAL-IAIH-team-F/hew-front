// page.tsx
"use client";

import Main from "~/Main";
import Timeline from "./timeline";
import Sidebar from "~/Sidebar/Sidebar"
import { useMemo } from "react";
import {Manager} from "~/manager/manager";
import { Productmanager } from '~/manager/ProductManager';

export default function Page({}: {}) {
  const manager = useMemo(() => new Manager(), []);
  const productManager = useMemo(() => new Productmanager(), []);
  return (
    <Main>
      <Timeline manager={manager}/>
      <Sidebar manager={manager} productManager={productManager}/>
    </Main>
  );
}
