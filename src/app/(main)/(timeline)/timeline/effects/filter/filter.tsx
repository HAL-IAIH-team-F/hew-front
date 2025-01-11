// components/effects/filter/filter.tsx
import React, {useEffect, useRef} from "react";
import * as THREE from "three";
import {EffectComposer, RenderPass, UnrealBloomPass} from "three-stdlib";

const Filter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    console.log("aadsadadw")
    // Three.jsの基本セットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // 球体オブジェクトの作成
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // カメラ位置の設定
    camera.position.z = 5;

    // ポストプロセシングの設定
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // UnrealBloomPassを追加してゴッドレイ効果を強調
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // 強度
      0.4, // 半径
      0.85 // 閾値
    );
    composer.addPass(bloomPass);

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      composer.render();
    };

    animate();

    // リサイズ処理
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      composer.dispose();
    };
  
}, []);

  return <div className="filterContainer" ref={containerRef}></div>;
};

export default Filter;
