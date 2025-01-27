import Link from "next/link";
import React, {ReactNode} from "react";
import {RouteUrl} from "~/route/RouteUrl";
import {iconContainerStyle} from "@/(main)/(timeline)/_sidebar/Styles";
import {useProductContext} from "~/products/ContextProvider";
import {usePathname} from "next/navigation";
import useRoutes from "~/route/useRoutes";

export default function SidebarRoutesLink(
  {
    children,
    routeUrl,
  }: {
    children?: ReactNode,
    routeUrl: RouteUrl,
  },
) {

  const {
    isSidebarOpen,
  } = useProductContext();
  const pathname = usePathname()
  const routes = useRoutes()

  return (
    <Link
      style={iconContainerStyle(isSidebarOpen)}
      href={routeUrl.pathname() == pathname ? routes.timeline().toString() : routeUrl.toString()}
      onClick={(event) => {
        if (pathname == routeUrl.pathname()) return
        routeUrl.transition(event)
      }}
    >{children}</Link>
  )
}
