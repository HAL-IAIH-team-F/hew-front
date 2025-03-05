"use client"
import React, {ReactNode, useEffect, useState} from 'react';
import {useProductContext} from '~/products/ContextProvider';
import {useWindowSize} from '@/_hook/useWindowSize';
import useProductId from "~/products/useProductId";
import useRoutes from "~/route/useRoutes";
import useTimelineWindowSize from "@/(main)/(timeline)/_timeline/useTimelineWindowSize";
import MainWindowBg from "@/(main)/(timeline)/_window/_main/MainWindowBg";
import {Theme} from "@/Theme";

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
  const timelineWindowSize = useTimelineWindowSize()
  children = routes.timeline().isCurrent() || (timelineWindowSize.responsive.type != "pc" && productId != undefined)
      ? undefined : children
  const [isRendering, setIsRendering] = useState(children != undefined)
  const [isOpen, setIsOpen] = useState(children != undefined)


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

  // const windowWidth = width
  // const windowHeight = height
  //
  // const calculatedWidth = isSidebarOpen
  //     ? productId != undefined
  //         ? windowWidth - 750 // ProductisOpen が true の場合の幅
  //         : windowWidth - 170 // ProductisOpen が false の場合の幅
  //     : productId != undefined
  //         ? windowWidth - 630 // isOpen が false かつ ProductisOpen が true の場合の幅
  //         : windowWidth - 70; // isOpen が false かつ ProductisOpen が false の場合の幅
  //
  // const calculatedLeft = isSidebarOpen
  //     ? productId != undefined
  //         ? (windowWidth / 2) - 240 // ProductisOpen が true の場合の位置
  //         : (windowWidth / 2) + 40 // ProductisOpen が false の場合の位置
  //     : productId != undefined
  //         ? (windowWidth / 2) - 300 // isOpen が false かつ ProductisOpen が true の場合の位置
  //         : windowWidth / 2; // isOpen が false かつ ProductisOpen が false の場合の位置

  return (
      isRendering &&
      <div
        style={
          // pageWindowStyle(isSidebarOpen, productId != undefined, isOpen, size.width, size.height)
          {
            backgroundColor: Theme.bg,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: `${timelineWindowSize.main.width}px`,
            height: `${timelineWindowSize.main.height}px`,
            position: 'fixed',
            left: `${timelineWindowSize.main.left}px`,
            top: `${timelineWindowSize.main.top}px`,
            transform: isOpen
                ? 'translateX(0)'
                : 'translateX(-50%)',
            borderRadius: '28px',
            opacity: isOpen ? 1 : 0,
            transition: `
      opacity 0.3s ease-in-out, 
      transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
      width 0.3s ease, 
      left 0.3s ease`,
            zIndex: 9,
            display: "flex",
            minWidth: isOpen ? '550px' : '0',
          }
        }
      >
        <MainWindowBg>{children}</MainWindowBg>
      </div>

  );
};

export default MainWindow;
