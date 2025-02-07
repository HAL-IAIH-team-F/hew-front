"use client"
import React, {ReactNode, useEffect, useState} from 'react';
import {inAppPageStyle, pageWindowStyle} from '../_sidebar/Styles';
import {MOBILE_WIDTH, useProductContext} from '~/products/ContextProvider';
import {useWindowSize} from '@/_hook/useWindowSize';
import useProductId from "~/products/useProductId";
import useRoutes from "~/route/useRoutes";

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
    children = routes.timeline().isCurrent() || (size.width < MOBILE_WIDTH && productId != undefined)
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

    return (
        isRendering &&
        <div
          style={pageWindowStyle(isSidebarOpen, productId != undefined, isOpen, size.width, size.height)}>
          <div style={inAppPageStyle(children != undefined)}>
            <div style={{display: "block"}} className={"h-full"}>
                {children}
            </div>
          </div>
        </div>
    );
};

export default MainWindow;
