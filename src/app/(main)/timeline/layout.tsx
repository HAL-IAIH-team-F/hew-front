"use client"
import {ReactNode, useMemo} from "react";
import {ProductProvider} from "~/products/ContextProvider";
import {Manager} from "~/manager/manager";
import Sidebar from "~/Sidebar/Sidebar";
import RightProductWindows from "~/products/RightProductWindows";
import Timeline from "@/(main)/timeline/timeline";
import {usePathname} from "next/navigation";

export default function Layout(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {
  const manager = useMemo(() => new Manager(), []);
  const pathname = usePathname()

  return (
    <>
      <ProductProvider>
        <Timeline manager={manager}/>
        <Sidebar manager={manager}>
          {pathname == "/timeline" ? undefined : children}
        </Sidebar>
        <RightProductWindows/>
      </ProductProvider>
    </>
  )
}
