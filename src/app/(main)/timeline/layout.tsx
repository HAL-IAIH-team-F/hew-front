"use client"
import {ReactNode} from "react";
import {ProductProvider} from "~/products/ContextProvider";
import Sidebar from "~/Sidebar/Sidebar";
import RightProductWindows from "~/products/RightProductWindows";
import Timeline from "@/(main)/timeline/timeline";
import {usePathname} from "next/navigation";
import {SidebarManagerProvider} from "@/(main)/timeline/SidebarManaager";

export default function Layout(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {
  const pathname = usePathname()

  return (
    <>
      <ProductProvider>
        <SidebarManagerProvider>
          <Timeline/>
          <Sidebar>
            {pathname == "/timeline" ? undefined : children}
          </Sidebar>
          <RightProductWindows/>
        </SidebarManagerProvider>
      </ProductProvider>
    </>
  )
}
