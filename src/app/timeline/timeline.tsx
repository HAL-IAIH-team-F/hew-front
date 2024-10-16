"use client";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createBubbles,onClickBubble } from "./bubble/bubbles";
import { Manager } from "./manager/manager";
import { createGradientBackground } from "./background/background";
import { moveBubblesToPosition } from "./bubble/position"
import { generateGomi } from "./Effect/gomi/gomi";

const Timeline = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bubblesRef = useRef<THREE.Mesh[]>([]);
  const glowingGomiRef = useRef<THREE.Mesh[]>([]);
  const scene   = useMemo(()=>new THREE.Scene(),[])
  const manager = useMemo(()=>new Manager(),[])

  useEffect(() => {
    if (!sceneRef.current && mountRef.current) {

      createGradientBackground(scene, manager.value.sessionId);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 500;
      cameraRef.current = camera;
      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;

      mountRef.current.appendChild(renderer.domElement);
      generateGomi(scene, glowingGomiRef.current, 300,manager.value.riseSpeed);
      bubblesRef.current = createBubbles(scene, manager.value.bbnum, manager.value.sessionId, []);
      if (manager.value.sessionId === 1)
      {
        moveBubblesToPosition(bubblesRef.current, manager.value.sessionId);
      }

      const animateHighFPS = (time: number) => {
        requestAnimationFrame(animateHighFPS);

        const currentTime = time / 1000;
        const deltaTime = currentTime - manager.value.lastFrameTimeHigh;

        if (deltaTime >= 1 / manager.value.fpshigh) {
          manager.value.lastFrameTimeHigh = currentTime;

          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        }
      };

      const animateLowFPS = (time: number) => {
        requestAnimationFrame(animateLowFPS);

        const currentTime = time / 1000;
        const deltaTime = currentTime - manager.value.lastFrameTimeLow;

        if (deltaTime >= 1 / manager.value.fpslow) {
          manager.value.lastFrameTimeLow = currentTime;
        }
      };

      animateHighFPS(0);
      animateLowFPS(0);
    }

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const handleClick = (event: MouseEvent,) => {
      if (sceneRef.current && cameraRef.current && bubblesRef.current && manager.value.animstate == "idle" && rendererRef.current) {
        onClickBubble(manager, event, bubblesRef.current, cameraRef.current, sceneRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};
export default Timeline;
