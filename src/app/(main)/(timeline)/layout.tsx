"use client"
import {ReactNode, Suspense} from "react";
import {ProductProvider} from "~/products/ContextProvider";
import Sidebar from "@/(main)/(timeline)/_sidebar/Sidebar";
import RightWindow from "@/(main)/(timeline)/_window/RightWindow";
import {usePathname} from "next/navigation";
import {SidebarManagerProvider} from "@/(main)/(timeline)/_sidebar/SidebarManaager";
import {Timeline} from "@/(main)/(timeline)/timeline";
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
          <Suspense>
            <Sidebar>
              {pathname == "/" ? undefined : children}
            </Sidebar>
          </Suspense>
          <Overlay/>
          <Suspense>
            <RightWindow/>
          </Suspense>
        </SidebarManagerProvider>
      </ProductProvider>
    </>
  )
}
