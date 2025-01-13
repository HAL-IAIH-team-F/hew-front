"use client"
import {ReactNode} from "react";
import {ProductProvider} from "~/products/ContextProvider";
import Sidebar from "~/Sidebar/Sidebar";
import RightProductWindows from "~/products/RightProductWindows";
import {usePathname} from "next/navigation";
import {SidebarManagerProvider} from "@/(main)/(timeline)/SidebarManaager";
import {Timeline, TIMELINE_PATH} from "@/(main)/(timeline)/timeline";
import Overlay from "@/(main)/(timeline)/effects/overlay/overlay";

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
            {pathname == TIMELINE_PATH ? undefined : children}
          </Sidebar>
          <Overlay/>
          <RightProductWindows/>
        </SidebarManagerProvider>
      </ProductProvider>
    </>
  )
}
