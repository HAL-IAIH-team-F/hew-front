"use client"
import {ReactNode, useMemo} from "react";
import {ProductProvider} from "~/products/ContextProvider";
import Timeline from "@/(main)/(timeline)/timeline/timeline";
import {Manager} from "~/manager/manager";
import Sidebar from "~/Sidebar/Sidebar";
import RightProductWindows from "~/products/RightProductWindows";

export default function Layout(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {
  const manager = useMemo(() => new Manager(), []);


  return (
    <>
      <ProductProvider>
        <Timeline manager={manager}/>
        <Sidebar manager={manager}/>
        <RightProductWindows/>
      </ProductProvider>
    </>
  )
}
