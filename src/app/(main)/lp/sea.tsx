"use client";
import React from "react";
import {Canvas} from "@react-three/fiber";
import {SeaScene} from "@/_top/SeaScene";
import useRoutes from "~/route/useRoutes";

function Sea(
    {
        requestDescription,
    }: {
        requestDescription: boolean
    }
) {
    const routes = useRoutes()
    return (
        <div style={{width: "100vw", height: "100vh", position: "relative", backgroundColor: "black"}}>
            <Canvas style={{position: "absolute", top: 0, left: 0}}>
                <SeaScene requestDescription={requestDescription}/>
            </Canvas>
        </div>
    );
}

export default Sea;
