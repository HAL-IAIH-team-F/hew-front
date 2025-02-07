"use client";
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {SeaScene} from "./SeaScene";
import useRoutes from "~/route/useRoutes";
import {useClientState} from "~/api/context/ClientContextProvider";

function Sea({children}: { children?: ReactNode }) {
    const routes = useRoutes()
    const clientState = useClientState()
    const [fadeOut, setFadeOut] = useState<boolean>(false)
    const [node, setNode] = useState<ReactNode>(children)
    const prevPathRef = useRef<string>();
    useEffect(() => {
        const prevPath = prevPathRef.current;
        prevPathRef.current = routes.currentPath
        if (prevPath == undefined) return
        if (prevPath == routes.currentPath) return
        if (prevPath == routes.lpDescription().pathname()) return


        setFadeOut(true)
        const timeout = setTimeout(() => {
            setNode(children)
            setFadeOut(false)
        }, 2000);
        return () => clearTimeout(timeout)
    }, [routes.currentPath]);

    return (
        <div style={{width: "100vw", height: "100vh", position: "relative", backgroundColor: "black"}}>
            <Canvas style={{position: "absolute", top: 0, left: 0}}>
                <SeaScene onButtonClick={routes.lpDescription().isCurrent()}/>
            </Canvas>

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
                {node}
            </div>
        </div>
    );
};
export default Sea;
