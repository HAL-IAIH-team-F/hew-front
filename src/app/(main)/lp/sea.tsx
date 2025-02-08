"use client";
import React from "react";
import {Canvas} from "@react-three/fiber";
import {SeaScene} from "@/(main)/lp/SeaScene";

function Sea(
    {}: {}
) {
    return (
        <div style={{width: "100vw", height: "100vh", position: "relative", backgroundColor: "black"}}>
            <Canvas style={{position: "absolute", top: 0, left: 0}}>
                <SeaScene/>
            </Canvas>
        </div>
    );
}

export default Sea;
