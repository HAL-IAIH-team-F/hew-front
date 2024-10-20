"use client";
import * as THREE from "three";
import { gsap } from "gsap";
import { Manager } from "../manager/manager";


export const getRandomPositionWithExclusion = (minX: number,maxX: number,minY: number,maxY: number,bubbles: THREE.Mesh[],exclusionRadius: number,scale: number,sessionId:number) => {
    let posX: number | undefined;
    let posY: number | undefined;
    let tooClose = true;
  
    const buffer = 20 * scale; 
  
    while (tooClose) {
      posX = Math.random() * (maxX - minX - 2 * buffer) + minX + buffer;
      posY = Math.random() * (maxY - minY - 2 * buffer) + minY + buffer;
  
      if (sessionId !== 1) {
        while (posX > -100 && posX < 100 && posY > -100 && posY < 100) {
          posX = Math.random() * (maxX - minX - 2 * buffer) + minX + buffer;
          posY = Math.random() * (maxY - minY - 2 * buffer) + minY + buffer;
        }
      }
  
      tooClose = bubbles.some((otherBubble) => {
        if (!otherBubble || posX === undefined || posY === undefined) {
          return false;
        }
        const dx = posX - otherBubble.position.x;
        const dy = posY - otherBubble.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < exclusionRadius;
      });
    }
  
    return { x: posX!, y: posY! };
  };

export const getRandomPosition = (min: number, max: number, excludeMin: number, excludeMax: number) => {
    let pos = Math.random() * (max - min) + min;
    while (pos > excludeMin && pos < excludeMax) {
      pos = Math.random() * (max - min) + min;
    }
    return pos;
};

export const moveBubblesToPosition = (bubbles: THREE.Mesh[], currentSessionId: number) => {
  bubbles.forEach((bubble) => {
    if ((bubble as any).sessionId === currentSessionId) {
      gsap.to(bubble.position, {
        z: 200,
        duration: Math.random() * 1.2 + 1,
        ease: 'power2.out',
      });
    }
  });
};

export const initmoveBubblesToPosition = (bubbles: THREE.Mesh[], currentSessionId: number,nextstate: string,manager: Manager) => {
  bubbles.forEach((bubble) => {
    if ((bubble as any).sessionId === currentSessionId) {
      gsap.to(bubble.position, {
        z: 200,
        duration: Math.random() * 1.2 + 1,
        ease: 'power2.out',
        onComplete: () => {
          manager.update.animstate(nextstate)
        }
      });
    }
  });
};