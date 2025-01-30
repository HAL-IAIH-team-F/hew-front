import React, {ReactNode, Suspense} from "react";
import {ProductProvider} from "~/products/ContextProvider";
import {SidebarManagerProvider} from "@/(main)/(timeline)/_window/_sidebar/SidebarManaager";
import {Timeline} from "@/(main)/(timeline)/timeline";
import Overlay from "@/(main)/(timeline)/effects/overlay/overlay";
import Sidebar from "@/(main)/(timeline)/_window/_sidebar/Sidebar";
import RightWindow from "@/(main)/(timeline)/_window/_right/RightWindow";
import MainWindow from "@/(main)/(timeline)/_window/_main/MainWindow";

export default function Layout(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {
  return (
    <>
      <ProductProvider>
        <SidebarManagerProvider>
          <Timeline/>
          <Suspense>
            <Sidebar>
            </Sidebar>
            <MainWindow>
              {children}
            </MainWindow>
            <RightWindow/>
          </Suspense>
          <Overlay/>
        </SidebarManagerProvider>
      </ProductProvider>
    </>
  )
}
