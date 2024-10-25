// components/Effects.tsx
import { useFrame, extend, useThree, Camera } from '@react-three/fiber';
import { EffectComposer,ShaderPass } from 'three-stdlib';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { RenderPass } from 'three-stdlib';
import gsap from 'gsap';
import { initmoveBubblesToPosition } from '../../bubble/position';
import { Manager } from '../../system/manager';
import { ManagerRef,BubbleMesh, BubblesProps, GlowingGomiProps,EffectsComposerProps } from '@/timeline-fiber/system/interface';
import { BlurShader } from "./aaBlurShader"




export const EffectsComposer: React.FC<EffectsComposerProps> = ({ manager, effectsRef, bubbles }) => {
  const { scene, camera, gl, size, } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);

  useEffect(() => {
    const effects = new Effects(gl, scene, camera, size);
    effectsRef.current = effects;
    composerRef.current = effects.composer || null; // composer が undefined の場合は null を代入

    
    if (manager.value.sessionId === 1) {
      effects.startAnimation(bubbles.current, manager);
    }
    if (manager.value.animstate === "onclickBubble") {
      effects.clickBubbleAnimation();
    }
    
    return () => {
      effectsRef.current = null;
      composerRef.current = null;
    };
  }, []);


  return null;
};

export class Effects {
  composer: EffectComposer | undefined;
  horizontalBlurPass: ShaderPass | undefined;
  verticalBlurPass: ShaderPass | undefined;
  camera: Camera;
  scene: THREE.Scene;

  constructor(gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: Camera, size: { width: number, height: number }) {
    this.camera = camera;
    this.scene = scene;

    // EffectComposer の初期化
    
    const renderPass = new RenderPass(scene, camera);
    this.composer = new EffectComposer(gl);
    this.composer.addPass(renderPass);

    // 水平方向のブラー
    this.horizontalBlurPass = new ShaderPass(BlurShader);
    this.verticalBlurPass = new ShaderPass(BlurShader);

    // Make sure uniforms are set correctly
    this.horizontalBlurPass.material.uniforms['resolution'].value.set(size.width, size.height);
    this.verticalBlurPass.material.uniforms['resolution'].value.set(size.width, size.height);

    this.horizontalBlurPass.material.uniforms['resolution'].value = new THREE.Vector2(size.width, size.height);
    this.horizontalBlurPass.material.uniforms['direction'].value = new THREE.Vector2(0.0, 1.0);
    this.composer.addPass(this.horizontalBlurPass);

    // 垂直方向のブラー

    this.verticalBlurPass.material.uniforms['resolution'].value = new THREE.Vector2(size.width, size.height);
    this.verticalBlurPass.material.uniforms['direction'].value = new THREE.Vector2(0.0, 1.0);
    this.composer.addPass(this.verticalBlurPass);


    console.log(this.horizontalBlurPass.material.uniforms['resolution'].value);
    console.log(this.horizontalBlurPass.material.uniforms['direction'].value);  
    
    

  }

  startAnimation(bubbles: THREE.Mesh[], manager: ManagerRef) {
    const tl = gsap.timeline();
    initmoveBubblesToPosition(bubbles, manager.value.sessionId, 'idle', manager);
    // ブラーアニメーション
    tl.to(this.horizontalBlurPass?.material.uniforms['direction'].value, {
      x: 0.5,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.composer?.render(),
    });

    tl.to(this.verticalBlurPass?.material.uniforms['direction'].value, {
      y: 0.5,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.composer?.render(),
    }, "<");
    
    // カメラのアニメーション
    tl.to(this.camera, {
      fov: 70,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
        this.composer?.render();
      },
    }, "<");
    
    // ブラーの解除
    tl.to(this.horizontalBlurPass?.material.uniforms['direction'].value, {
      x: 0,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => this.composer?.render(),
    });
    tl.to(this.verticalBlurPass?.material.uniforms['direction'].value, {
      y: 0,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => this.composer?.render(),
    }, "<");
    
    // カメラのリセット
    tl.to(this.camera, {
      fov: 75,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
        this.composer?.render();
      },
    }, "<");
  }

  clickBubbleAnimation() {
    const tl = gsap.timeline();
    
    // ブラーのアニメーション
    tl.to(this.horizontalBlurPass?.material.uniforms['direction'].value, {
      x: 0.3,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.composer?.render(),
    });
    tl.to(this.verticalBlurPass?.material.uniforms['direction'].value, {
      y: 0.3,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.composer?.render(),
    }, "<");
    
    // カメラのアニメーション
    tl.to(this.camera, {
      fov: 90,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
        this.composer?.render();
      },
    }, "<");
    
    // ブラーの解除
    tl.to(this.horizontalBlurPass?.material.uniforms['direction'].value, {
      x: 0,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => this.composer?.render(),
    });
    tl.to(this.verticalBlurPass?.material.uniforms['direction'].value, {
      y: 0,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => this.composer?.render(),
    }, "<");
    
    // カメラのリセット
    tl.to(this.camera, {
      fov: 63,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
        this.composer?.render();
      },
    }, "<");
    tl.to(this.camera, {
      fov: 75,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
        this.composer?.render();
      },
    });
  }
}

