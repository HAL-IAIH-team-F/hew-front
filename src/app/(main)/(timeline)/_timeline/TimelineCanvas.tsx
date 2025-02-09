import React, {RefObject, useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import TimelineAnimation from "@/(main)/(timeline)/_timeline/TimelineAnimation";
import {PerspectiveCamera} from "@react-three/drei";
import CameraPosition from "@/(main)/(timeline)/_timeline/CameraPosition";
import * as THREE from "three";
import {BubbleMesh} from "@/(main)/(timeline)/_timeline/bubble/BubbleMesh";
import Effects from "@/(main)/(timeline)/effects/camera/Effects";
import BaubleClickHandler from "@/(main)/(timeline)/_timeline/BaubleClickHandler";


export default function TimelineCanvas(
    {}: TimelineAnimationProps,
) {// Effectsの参照を追加
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [aspect, setAspect] = useState<number>()
    useEffect(() => {
        setAspect(window.innerWidth / window.innerHeight)
    }, []);
    const bubblesRef = useRef<BubbleMesh[]>([]);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const [effects, setEffects] = useState<Effects>()
    return (
        <Canvas ref={canvasRef}
            className={"bg-[#05253e]"}
        >
            <TimelineAnimation sceneRef={sceneRef} bubblesRef={bubblesRef} effects={effects} setEffects={setEffects}/>
            <CameraPosition/>
            <BaubleClickHandler
                sceneRef={sceneRef} bubblesRef={bubblesRef} canvasRef={canvasRef} effects={effects}
            />
            <PerspectiveCamera
                fov={75}
                aspect={aspect}
                near={0.1}
                far={1000}
            />
        </Canvas>
    )
}

export interface TimelineAnimationProps {
    mountRef: RefObject<HTMLDivElement | null>
}
