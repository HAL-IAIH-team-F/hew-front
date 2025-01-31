import React, {RefObject, useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import TimelineAnimation from "@/(main)/(timeline)/_timeline/TimelineAnimation";
import {PerspectiveCamera} from "@react-three/drei";


export default function TimelineCanvas(
  {}: TimelineAnimationProps,
) {// Effectsの参照を追加
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [aspect, setAspect] = useState<number>()
  useEffect(() => {
    setAspect(window.innerWidth / window.innerHeight)
  }, []);
  return (
    <Canvas ref={canvasRef}>
      <TimelineAnimation/>
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
