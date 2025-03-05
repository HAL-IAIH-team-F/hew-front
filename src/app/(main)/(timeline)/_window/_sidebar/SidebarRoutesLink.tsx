import Link from "next/link";
import React, {ReactNode, useState} from "react";
import useRoutes from "~/route/useRoutes";
import useProductId from "~/products/useProductId";
import {TimelineRouteUrl} from "~/route/TimelineRouteUrl";
import useResponsive from "~/hooks/useResponsive";

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
  const routes = useRoutes()
  const productId = useProductId()
  const responsive = useResponsive().type
  const isMobile = responsive != "pc";
  const isShown = (!isMobile || productId == undefined) && routeUrl.isCurrent();
  if (isShown) routeUrl = routes.timeline()
  if (isMobile) routeUrl = routeUrl.setProductId(undefined)

  const [isHovered, setIsHovered] = useState(false);

  return (
      <Link
          href={routeUrl.toString()}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            borderRadius: "24px",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
            pointerEvents: "auto",
            cursor: "pointer",
            transform: isHovered ? "scale(1.2)" : "scale(1)",
            transformOrigin: "center",
            willChange: "transform",
            ...(
                responsive == "phone" ? {
                  width: "12.5%",
                  height: "75px",
                } : {
                  width: "75px",
                  height: "12.5%",
                }
            )
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(event) => {
            setTransitions(true)
            routeUrl.transition(event)?.then(() =>
                setTransitions(false)
            )
          }}
      >
        {children}
      </Link>
  )
}
