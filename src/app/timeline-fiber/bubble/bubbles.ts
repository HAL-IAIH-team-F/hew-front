"use client";
import * as THREE from "three";
import { getRandomPosition, getRandomPositionWithExclusion, moveBubblesToPosition } from "./position";
import { gsap } from "gsap";
import { Manager } from "../system/manager"
import { showProduct } from "../product/product";
import { createGradientBackground } from "../background/background"
import { Effects } from "../effects/camera/Effects";
import { Canvas, useThree,useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo, useState } from 'react';
import { ManagerRef, BubbleMesh, BubblesProps, GlowingGomiProps,EffectsComposerProps } from "../system/interface"



export const Bubbles: React.FC<BubblesProps> = ({ manager, bubblesRef }) => {
  const { scene } = useThree();
  useEffect(() => {
    bubblesRef.current = createBubbles(scene, manager.value.bbnum, manager.value.sessionId, []);
  }, [scene, manager, bubblesRef]);

  return null;
};

export const createBubbles = (scene: THREE.Scene, bubblecnt: number, sessionId: number,bubbles: THREE.Mesh[],) => {
  const textureLoader = new THREE.TextureLoader();

  for (let i = 0; i < bubblecnt; i++) {
    const bubbleTexture = textureLoader.load('/icon.png');
    const bubbleMaterial = new THREE.MeshBasicMaterial({
      map: bubbleTexture,
      transparent: true,
      opacity: 0.9,
    });

    const bubbleGeometry = new THREE.CircleGeometry(20, 32);
    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

    const scale = Math.random() * 0.5 + 0.5;
    bubble.scale.set(scale, scale, scale);

    let overlap = true;
    while (overlap) {
      const { x: newX, y: newY } = getRandomPositionWithExclusion(
        -400, 400, 
        -200, 200, 
        bubbles,
        50, 
        scale,
        sessionId
      );
      bubble.position.x = newX;
      bubble.position.y = newY;
      bubble.position.z = getRandomPosition(-1500, -200, -800, -300);

      overlap = bubbles.some((otherBubble) => {
        if (!otherBubble) return false;
        const dx = bubble.position.x - otherBubble.position.x;
        const dy = bubble.position.y - otherBubble.position.y;
        const dz = bubble.position.z - otherBubble.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const bubbleRadius = 20 * scale;
        const otherBubbleRadius = 20 * otherBubble.scale.x;

        return distance < bubbleRadius + otherBubbleRadius + 10;
      });
    }

    (bubble as any).sessionId = sessionId;
    (bubble as any).bubbleId = bubbles.length;

    scene.add(bubble);
    bubbles.push(bubble);

    bubble.scale.set(0, 0, 0);
    gsap.to(bubble.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 2,
      ease: 'elastic.out(1, 0.75)',
    });

    const randomRotationSpeed = Math.random() * 0.05 + 0.01;
    const randomAmplitude = Math.random() * 1 + 0.1;
    const randomDuration = Math.random() * 1 + 0.5;

    const rotationAnimation = gsap.to(bubble.rotation, {
      x: `+=${randomRotationSpeed}`,
      y: `+=${randomRotationSpeed}`,
      duration: randomDuration,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    const positionAnimation = gsap.to(bubble.position, {
      y: `+=${randomAmplitude}`, 
      duration: randomDuration,  
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      paused: true,
    });

    const startBubbleAnimation = () => {
      rotationAnimation.play();
      positionAnimation.play();
    };

    const stopBubbleAnimation = () => {
      rotationAnimation.pause();
      positionAnimation.pause();
    };

    startBubbleAnimation();

    (bubble as any).startAnimation = startBubbleAnimation;
    (bubble as any).stopAnimation = stopBubbleAnimation;
  }

  return bubbles;
};

export const onClickBubble = (manager : Manager, event: MouseEvent, bubbles: THREE.Mesh[], camera: THREE.PerspectiveCamera, scene: THREE.Scene , effects: Effects) => {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(bubbles);

  if (intersects.length > 0) {
    const clickedBubble = intersects[0].object as THREE.Mesh;
    
    (clickedBubble as any).stopAnimation();
    
    if ((clickedBubble as any).bubbleId == 999)
    {
      console.log(manager.value.animstate);
      if (manager.value.animstate != "product")
      {
        showProduct(clickedBubble,scene,camera,manager)
        manager.update.animstate("product");
      }
    }else{
      if (manager.value.animstate == "idle")
      {
        manager.update.animstate("onclickBubble")
        createGradientBackground(scene, manager.value.sessionId);
        effects.clickBubbleAnimation()
        
        gsap.to(clickedBubble.position, {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z - 200,
          duration: 1.5,
          ease: "power2.inOut",
        });
        gsap.to(clickedBubble.scale, {
          x: 3.3,
          y: 3.3,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            (clickedBubble as any).bubbleId = 999;
            manager.update.sessionId(manager.value.sessionId + 1);
            const newBubbles = createBubbles(scene, manager.value.bbnum - 1, manager.value.sessionId, bubbles);
            moveBubblesToPosition(newBubbles, manager.value.sessionId);
          },
        });

        bubbles.forEach((bubble) => {
          if (bubble !== clickedBubble) {
            (bubble as any).stopAnimation();
            gsap.to(bubble.position, {
              y: bubble.position.y,
              z: bubble.position.z + 300,
              duration: Math.random() * 0.4 + 1, 
              ease: "power4.inOut"
            });
            
            gsap.to(bubble.material, {
              opacity: 0,
              duration: 3,
              ease: "power2.inOut",
              onComplete: () => {
                scene.remove(bubble);
                const bubbleIndex = bubbles.indexOf(bubble);
                if (bubbleIndex !== -1) {
                  bubbles.splice(bubbleIndex, 1);
                }
                manager.update.animstate("idle")
                
              },
            });
          }
        });
      }else{
        console.log(manager.value.animstate)
      }
    }
  }
};