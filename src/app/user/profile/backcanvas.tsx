import React, { useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface User {
    icon?: {
      strUrl: () => string;
    };
  }
THREE.TextureLoader.prototype.crossOrigin = "*"

// カーブ状にカードを配置
const RotatingCard : React.FC<{ user: User | undefined }> = ({ user }) => {
    const cardRef = React.useRef<any>();
    const [aspectRatio, setAspectRatio] = useState(1); // アスペクト比を保存
    if(user?.icon === undefined) return
    // テクスチャを読み込む（画像ファイルのパスを指定）
    
    const texture = useLoader(THREE.TextureLoader, user.icon.strUrl());
    useEffect(() => {
        if (texture) {
          // 画像の幅と高さからアスペクト比を計算
          setAspectRatio(texture.image.width / texture.image.height);
        }
      }, [texture]);
    // カードを回転させるアニメーション
    useFrame(() => {
      if (cardRef.current) {
        cardRef.current.rotation.y += 0.005; // Y軸を基準に回転
      }
    });
  
    return (
        <mesh ref={cardRef} rotation={[0,0, -0.2]} position={[0,2.7,0]}>
            {/* カードの形状 */}
            <RoundedBox args={[20, 13, 0.36]} radius={0.2} smoothness={14}>
                <meshStandardMaterial color={'#ffffff'} />
            </RoundedBox>
            <meshStandardMaterial color={'#ffffff'} />
            {/* 画像用の小さな平面 */}
            <mesh position={[6, 0.5, 0.2002]}> {/* カードの正面に少し浮かせる */}
                {/* アスペクト比を反映してサイズを調整 */}
                <planeGeometry args={[6.5, 6.5 / aspectRatio]} />
                <meshStandardMaterial 
                map={texture}
                />
                
            </mesh>
        </mesh>
    );
  };
// メインCanvas
const Backcanvas : React.FC<{ user: User | undefined }> = ({ user }) => {
  return (
    <div style={{widows:"100vh",height: "100vh" }}>
        <Canvas
            camera={{
                position: [0, 0, 37], // カメラ位置
                fov: 60, // 視野角
                near: 0.1, // 最近距離
                far: 2000, // 最遠距離
            }}
            >
            {/* 環境光 */}
            <ambientLight intensity={0.4} />
            {/* 方向光 */}
            <directionalLight position={[0, 0, 5]} intensity={2} />
            {/* カード */}
            <RotatingCard user={user}/>
        </Canvas>
    </div>
  );
};

export default Backcanvas;
