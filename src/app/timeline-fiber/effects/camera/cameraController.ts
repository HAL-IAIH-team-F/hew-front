import { Canvas, useThree,useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo, useState } from 'react';
import { Manager } from "../../system/manager";

type ManagerRef = { value: Manager['value']; update: Manager['update'] };
export const CameraController: React.FC<{ targetPosition: React.MutableRefObject<{ x: number; y: number; z: number }>, targetRotation: React.MutableRefObject<{ x: number; y: number }>,manager:ManagerRef }> = ({ targetPosition, targetRotation,manager }) => {
    const { camera} = useThree();
    const parallaxStrength = 0.2;
    const rotationStrength = 0.05;
  
    useFrame(() => {
  
      const animateHighFPS = (time: number) => {
        requestAnimationFrame(animateHighFPS);
        const currentTime = time / 1000;
        const deltaTime = currentTime - manager.value.lastFrameTimeHigh;
        if (camera) {
          camera.position.x += (targetPosition.current.x - camera.position.x) * parallaxStrength;
          camera.position.y += (targetPosition.current.y - camera.position.y) * parallaxStrength;
          camera.rotation.x += (targetRotation.current.y - camera.rotation.x) * rotationStrength;
          camera.rotation.y += (targetRotation.current.x - camera.rotation.y) * rotationStrength;
  
        }
      };
      animateHighFPS(60);
    });
    return null;
  };
  