"use client"
import React, {ReactNode, useEffect, useState} from 'react';
import {inAppPageStyle, pageWindowStyle} from '../_sidebar/Styles';
import {useProductContext} from '~/products/ContextProvider';
import {useWindowSize} from '@/_hook/useWindowSize';
import useProductId from "~/products/useProductId";
import useRoutes from "~/route/useRoutes";
import {X} from "lucide-react";
import useResponsive from "~/hooks/useResponsive";

const MainWindow: React.FC<{
  children?: ReactNode
}> = (
    {children}
) => {
  const {
    isSidebarOpen,
  } = useProductContext();
  const productId = useProductId()
  const size = useWindowSize()
  const routes = useRoutes()
  const responsive = useResponsive()
  children = routes.timeline().isCurrent() || (responsive.type != "pc" && productId != undefined)
      ? undefined : children
  const [isRendering, setIsRendering] = useState(children != undefined)
  const [isOpen, setIsOpen] = useState(children != undefined)

  const closeHandler = () => {
    routes.timeline().transition()
  }

  useEffect(() => {
    const isNextRendering = children != undefined
    if (isNextRendering) {
      setIsRendering(true)
      const timeout = setTimeout(() => {
        setIsOpen(true)
      }, 0)
      return () => clearTimeout(timeout)
    }
    setIsOpen(false)
    const timeout = setTimeout(() => {
      setIsRendering(false)
    }, 300)
    return () => clearTimeout(timeout)
  }, [children != undefined]);

  return (
      isRendering &&
      <div
        style={pageWindowStyle(isSidebarOpen, productId != undefined, isOpen, size.width, size.height)}
      >

        <div style={inAppPageStyle(children != undefined)} className="relative">
          <button
            onClick={closeHandler}
            className="group absolute top-3 right-3 p-2 rounded-full
                                bg-zinc-900/40 backdrop-blur-sm
                                border border-zinc-300/50
                                transition-all duration-300 ease-in-out
                                hover:scale-110 hover:bg-zinc-800/60
                                hover:border-zinc-600 z-[9999]"
          >
            <X className="w-5 h-5 text-zinc-300 transition-colors duration-300
                                  group-hover:text-white"/>
          </button>
          <div style={{display: "block"}} className={"h-full"}>
            {children}
          </div>
        </div>
      </div>

  );
};

export default MainWindow;
