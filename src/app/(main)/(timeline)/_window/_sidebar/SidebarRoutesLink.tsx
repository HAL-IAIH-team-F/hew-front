import Link from "next/link";
import React, {ReactNode, useState} from "react";
import {iconContainerStyle} from "@/(main)/(timeline)/_window/_sidebar/Styles";
import {MOBILE_WIDTH, useProductContext} from "~/products/ContextProvider";
import useRoutes from "~/route/useRoutes";
import {useWindowSize} from "@/_hook/useWindowSize";
import useProductId from "~/products/useProductId";
import {TimelineRouteUrl} from "~/route/TimelineRouteUrl";

export default function SidebarRoutesLink(
  {
    children,
    routeUrl,
    setTransitions,
  }: {
    children?: ReactNode,
    routeUrl: TimelineRouteUrl,
    setTransitions: (transitions: boolean) => void 
  },
) {

  const {
    isSidebarOpen,
  } = useProductContext();
  const routes = useRoutes()
  const windowSize = useWindowSize();
  const productId = useProductId()
  const isMobile = windowSize.width < MOBILE_WIDTH;
  const isShown = (!isMobile || productId == undefined) && routeUrl.isCurrent();
  if (isShown) routeUrl = routes.timeline()
  if (isMobile) routeUrl = routeUrl.setProductId(undefined)
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={routeUrl.toString()}
      style={{
        ...iconContainerStyle(isHovered),
        height: "12.5%"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(event) => {
        setTransitions(true)
        routeUrl.transition(event)?.then(()=>
          setTransitions(false) 
        )
      }}
    >
      {children}
    </Link>
  )
}
