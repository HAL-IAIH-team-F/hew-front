"use client";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createBubbles, onClickBubble } from "./bubble/bubbles";
import { Manager } from "./manager/manager";
import { EffectComposer } from "three-stdlib";
import { createGradientBackground } from "./background/background";
import { generateGomi } from "./effects/gomi/gomi";
import Effects from "./effects/camera/Effects";

const Timeline = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const bubblesRef = useRef<THREE.Mesh[]>([]);
  const glowingGomiRef = useRef<THREE.Mesh[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetCameraPosition = useRef({ x: 0, y: 0 });
  const targetCameraRotation = useRef({ x: 0, y: 0 });
  const parallaxStrength = 0.2;
  const rotationStrength = 0.05;
  const scene = useMemo(() => new THREE.Scene(), []);
  const manager = useMemo(() => new Manager(), []);
  const effectsRef = useRef<Effects | null>(null); // Effectsの参照を追加

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
      
      const effects = new Effects(renderer, scene, camera);
      effectsRef.current = effects; // Effectsインスタンスを参照に保存
      
      const { composer } = effects;
      composerRef.current = composer;
 
      generateGomi(scene, glowingGomiRef.current, 300, manager.value.riseSpeed,manager);
      bubblesRef.current = createBubbles(scene, manager.value.bbnum, manager.value.sessionId, [],camera);
      
      if (manager.value.sessionId == 1) {
        effects.startAnimesion(bubblesRef.current,manager)
      }
      
      const animateHighFPS = (time: number) => {
        requestAnimationFrame(animateHighFPS);
        const currentTime = time / 1000;
        const deltaTime = currentTime - manager.value.lastFrameTimeHigh;
        
        if (deltaTime >= 1 / manager.value.fpshigh) {
          manager.value.lastFrameTimeHigh = currentTime;
          if (cameraRef.current) {
            cameraRef.current.position.x += (targetCameraPosition.current.x - cameraRef.current.position.x) * parallaxStrength;
            cameraRef.current.position.y += (targetCameraPosition.current.y - cameraRef.current.position.y) * parallaxStrength;
            cameraRef.current.rotation.x += (targetCameraRotation.current.y - cameraRef.current.rotation.x) * rotationStrength;
            cameraRef.current.rotation.y += (targetCameraRotation.current.x - cameraRef.current.rotation.y) * rotationStrength;
          }
          if (composerRef.current && sceneRef.current && cameraRef.current) {
            composerRef.current.render();
          }
        }
      };
      animateHighFPS(0);
    }

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
      if (composerRef.current) {
        composerRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    
      targetCameraRotation.current.x = -mousePosition.current.x * 0.07;
      targetCameraRotation.current.y = -mousePosition.current.y * 0.07;
    };
    
    const handleClick = (event: MouseEvent) => {
      if (sceneRef.current && cameraRef.current && bubblesRef.current && manager.value.animstate === "idle" && rendererRef.current &&  effectsRef.current) {
        onClickBubble(manager, event, bubblesRef.current, cameraRef.current, sceneRef.current, effectsRef.current);
        
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);
  return (<div ref={mountRef} style={{ width: '100vw', height: '100vh'}} />)

};
export default Timeline;


