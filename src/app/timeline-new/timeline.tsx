"use client"
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Background from './background/background';
import { PerspectiveCamera } from 'three';
import Loaded from './_loaded/Loaded';

// PerspectiveCameraを拡張
extend({ PerspectiveCamera });

const CameraController: React.FC = () => {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetCameraRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      const newPosition = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
      setMousePosition(newPosition);

      targetCameraRotation.current.x = -newPosition.x * 0.01;
      targetCameraRotation.current.y = -newPosition.y * 0.01;
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // カメラの更新をフレームごとに実行
  useFrame(() => {
    camera.rotation.x += (targetCameraRotation.current.y - camera.rotation.x) * 0.1;
    camera.rotation.y += (targetCameraRotation.current.x - camera.rotation.y) * 0.1;
  });

  return null;
};

const Timeline: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 200], fov: 75, near: 0.1, far: 1000 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <color attach="background" args={[0x000000]} />
      
      <CameraController />
      <Background sessionId={1} />
      
      <Loaded scale={10}/>
    </Canvas>
    
  );
};

export default Timeline;
