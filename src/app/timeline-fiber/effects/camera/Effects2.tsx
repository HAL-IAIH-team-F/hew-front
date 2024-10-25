// components/Effects.tsx
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { BlurShader } from './aaBlurShader';

export const EffectsComposer2: React.FC = () => {
  const { scene, camera, size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // シェーダーの初期設定
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms['resolution'].value.set(size.width, size.height);
      materialRef.current.uniforms['direction'].value.set(1.0, 0.0);
    }
  }, [size]);

  // アニメーションの開始
  const startAnimation = () => {
    if (materialRef.current) {
      const tl = gsap.timeline();
      // 水平方向のブラー
      tl.to(materialRef.current.uniforms['direction'].value, {
        x: 0.5,
        duration: 0.5,
        ease: 'power2.out',
      });
      // 垂直方向のブラー
      tl.to(materialRef.current.uniforms['direction'].value, {
        y: 0.5,
        duration: 0.5,
        ease: 'power2.out',
      }, "<");
      // カメラのアニメーション
      tl.to(camera, {
        fov: 70,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => camera.updateProjectionMatrix(),
      }, "<");
      // ブラーの解除
      tl.to(materialRef.current.uniforms['direction'].value, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      });
      // カメラのリセット
      tl.to(camera, {
        fov: 75,
        duration: 3,
        ease: 'power2.out',
        onUpdate: () => camera.updateProjectionMatrix(),
      }, "<");
    }
  };

  // 毎フレームの更新
  useFrame(() => {
    // 必要に応じてエフェクトの更新処理を行う
  });

  return (
    <mesh onClick={startAnimation}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={THREE.UniformsUtils.clone(BlurShader.uniforms)}
        vertexShader={BlurShader.vertexShader}
        fragmentShader={BlurShader.fragmentShader}
      />
    </mesh>
  );
};
