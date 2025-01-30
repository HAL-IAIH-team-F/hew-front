import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import Card from "./cardDesign";

interface User {
  icon?: {
    strUrl: () => string;
  };
  name: string;
  id: string;
}

const RotatingCard: React.FC<{ user: User | undefined }> = ({ user }) => {
  const cardRef = React.useRef<any>();

  useFrame(() => {
    if (cardRef.current) {
      cardRef.current.rotation.y += 0.006;
    }
  });

  return (
    <mesh ref={cardRef} rotation={[0, 0, -0.2]} position={[0, 0, 0]}>
      <RoundedBox args={[20, 13, 0.6]} radius={0.3} smoothness={12}>
        <meshStandardMaterial
          color="black"
          metalness={0.8}
          roughness={0.2}
          side={THREE.FrontSide}
        />
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
            <Card user={user} />
          </div>
        </Html>
      </RoundedBox>
    </mesh>
  );
};

const Backcanvas: React.FC<{ user: User | undefined }> = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={"w-full h-[300px] overflow-x-hidden"}
    >
      <Canvas
      camera={{
        position: [0, 0, 27], // カメラ位置
        fov: 40, // 視野角
        near: 0.1, // 最近距離
        far: 2000, // 最遠距離
      }}
      style={{
        width: "calc(100% - 10px)", // 左右5pxずつの余白を考慮
        height: "300px",
        marginTop: "5px",
        marginRight: "5px",
        marginLeft: "5px",
        backgroundColor: "#ffffffff",
        borderTopRightRadius: "28px",
        borderTopLeftRadius: "28px",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        border: isHovered ? "2px solid turquoise" : "2px solid transparent",
        overflow: "hidden", // ボーダー外の要素を隠す
        transition: "transform 0.3s ease, border 0.3s ease", // スムーズなアニメーション
        display: "block", // 親要素に合わせる
        transformOrigin: "top center", // 拡大の基点を上に設定
        transform: isHovered
          ? "scaleY(1.05)" // 縦方向に拡大
          : "scaleY(1)", // 通常時
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 環境光 */}
      <ambientLight intensity={0.4} />
      {/* 方向光 */}
      <directionalLight position={[0, 0, 5]} intensity={2} />
      {/* カード */}
      <RotatingCard user={user} />
    </Canvas>
    </div>
  );
};

export default Backcanvas;
