"use client"
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";

export default function Layout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {
    const routes = useRoutes()
    const clientState = useClientState()
    const [fadeOut, setFadeOut] = useState<boolean>(false)
    const prevPathRef = useRef<string>();
    useEffect(() => {
        const prevPath = prevPathRef.current;
        prevPathRef.current = routes.currentPath
        if (prevPath == undefined) return
        if (prevPath == routes.currentPath) return
        if (prevPath == routes.lpDescription().pathname()) return


        // setFadeOut(true)
        // const timeout = setTimeout(() => {
        //     setNode(children)
        //     setFadeOut(false)
        // }, 2000);
        // return () => clearTimeout(timeout)
    }, [routes.currentPath]);


    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transition: "opacity 2s ease-out, visibility 2s ease-out",
                    opacity: 1,
                    visibility: "visible",
                    pointerEvents: "auto",
                    ...(fadeOut ? {
                        opacity: 0,
                        visibility: "hidden",
                        pointerEvents: "none",
                    } : {}),
                }}
            >
                {children}
            </div>
        </>
    )
}
