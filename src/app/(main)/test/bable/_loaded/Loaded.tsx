"use client"
import {Canvas} from "@react-three/fiber";
import Animation from "./Animation";
import FoamWithCircle from "./FoamWithCircle";
import useWindow from "../../../../../util/hook/useWindow";

export default function Loaded(
  {}: LoadingProps,
) {
  const window = useWindow()

  return (
    <div
      style={{
        background: "#000",
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 3],
          fov: 75,
          aspect: window && (window.innerWidth / window.innerHeight),
          near: 0.1,
          far: 1000,
        }}
        resize={{debounce: 0}}
        gl={{
          alpha: true,
        }}
        color={"#fff"}
      >
        <Animation>
          {/*<ambientLight args={[0xffffff, 2]} position={[10, 400, -500]}/>*/}
          <ambientLight args={[0xffffff, 0.0001]} position={[0, 0, 10]}/>
          <FoamWithCircle texturePath={"/2020-01-01_09.26.42.png"}/>
        </Animation>
      </Canvas>
    </div>
  )
}


export interface LoadingProps {
}

 