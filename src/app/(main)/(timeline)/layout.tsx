"use client"
import {ReactNode} from "react";
import {ProductProvider} from "~/products/ContextProvider";
import Sidebar from "@/(main)/(timeline)/_sidebar/Sidebar";
import RightWindow from "@/(main)/(timeline)/_window/RightWindow";
import {usePathname} from "next/navigation";
import {SidebarManagerProvider} from "@/(main)/(timeline)/_sidebar/SidebarManaager";
import {Timeline} from "@/(main)/(timeline)/timeline";
import Overlay from "@/(main)/(timeline)/effects/overlay/overlay";
import useRoutes from "~/route/useRoutes";

export default function Layout(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {
  const pathname = usePathname()
  const routes = useRoutes()
  return (
    <>
      <ProductProvider>
        <SidebarManagerProvider>
          <Timeline/>
          <Sidebar>
            {pathname == routes.timeline().pathname() ? undefined : children}
          </Sidebar>
          <Overlay/>
          <RightWindow/>
        </SidebarManagerProvider>
      </ProductProvider>
    </>
  )
}
