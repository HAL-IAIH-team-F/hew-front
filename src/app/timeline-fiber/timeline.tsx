import { Canvas, useThree} from '@react-three/fiber';
import { useEffect, useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { onClickBubble } from './bubble/bubbles';
import { Manager } from "./system/manager";
import { CameraController } from "./effects/camera/cameraController"
import { BubbleMesh,EffectsComposerProps } from "./system/interface"
import { Bubbles } from "./bubble/bubbles"
import { GlowingGomi } from './effects/gomi/gomi';
import { GradientBackground } from './background/background';
import { Effects, EffectsComposer } from './effects/camera/Effects';
import { EffectsComposer2 } from './effects/camera/Effects2';

const Timeline: React.FC = () => {
  const manager = useMemo(() => new Manager(), []);
  const bubblesRef = useRef<BubbleMesh[]>([]);
  const glowingGomiRef = useRef<THREE.Mesh[]>([]);
  const effectsRef = useRef<Effects | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCameraPosition = useRef({ x: 0, y: 0, z: 500 });
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
  
    const handleBubbleClick = (event: MouseEvent) => {
      if (
        effectsRef.current &&
        cameraRef.current &&
        manager.value.animstate === "idle"
      ) {
        console.log("on click");
        onClickBubble(
          manager,
          event,
          bubblesRef.current,
          cameraRef.current,
          effectsRef.current.scene,
          effectsRef.current
        );
      }
    };
  
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("click", handleBubbleClick);
  
    // クリーンアップ関数でメモリリークを防止
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("click", handleBubbleClick);
    };
  }, [manager, bubblesRef, effectsRef]);

  return (
    <Canvas
      onCreated={({ gl,camera }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
        gl.setClearColor(new THREE.Color(0x000000));
        cameraRef.current = camera as THREE.PerspectiveCamera; // カメラを設定
      }}
      camera={{ position: [0, 0, 500], fov: 75 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <CameraController targetPosition={targetCameraPosition} targetRotation={targetCameraRotation} manager={manager} />
      <GradientBackground manager={manager} />
      <Bubbles            manager={manager} bubblesRef={bubblesRef} />
      <GlowingGomi        manager={manager} glowingGomiRef={glowingGomiRef} />
      <EffectsComposer    manager={manager} effectsRef={effectsRef} bubbles={bubblesRef} />
    </Canvas>
  );
};

export default Timeline;
