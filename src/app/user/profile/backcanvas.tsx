import React from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import {Html, RoundedBox} from "@react-three/drei";
import * as THREE from "three";
import Card from "./cardDesign";

interface User {
  icon?: {
    strUrl: () => string;
  };
  name: string,
  id: string,
}

const RotatingCard: React.FC<{ user: User | undefined }> = ({user}) => {
  const cardRef = React.useRef<any>();

  useFrame(() => {
    if (cardRef.current) {
      cardRef.current.rotation.y += 0.006;
    }
  });

  return (
    <mesh ref={cardRef} rotation={[0, 0, -0.2]} position={[0, 2.7, 0]}>

      <RoundedBox args={[20, 13, 0.6]} radius={0.3} smoothness={12}>
        <meshStandardMaterial color="black" metalness={0.8} roughness={0.2} side={THREE.FrontSide}/>
        {/* 表側のHTML */}
        <Html
          transform
          position={[0, -0.45, 0.05]} // 少し前面に配置
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Card user={user}/>
          </div>
        </Html>
      </RoundedBox>
    </mesh>
  );
};
// メインCanvas
const Backcanvas: React.FC<{ user: User | undefined }> = ({user}) => {
  return (
    <div style={{widows: "100vh", height: "100vh"}}>
      <Canvas
        camera={{
          position: [0, 0, 37], // カメラ位置
          fov: 60, // 視野角
          near: 0.1, // 最近距離
          far: 2000, // 最遠距離
        }}
      >
        {/* 環境光 */}
        <ambientLight intensity={0.4}/>
        {/* 方向光 */}
        <directionalLight position={[0, 0, 5]} intensity={2}/>
        {/* カード */}
        <RotatingCard user={user}/>
      </Canvas>
    </div>
  );
};

export default Backcanvas;
