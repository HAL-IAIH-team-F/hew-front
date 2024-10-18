"use client";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { Water } from "three-stdlib";
import { EffectComposer } from "three-stdlib";
import { RenderPass } from "three-stdlib";
import { UnrealBloomPass } from "three-stdlib";
import { FilmPass } from "three-stdlib";
import { createCombinedGUI } from "./GUI";

export const Sea = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const waterRef = useRef<Water | null>(null);
  const scene = useMemo(() => new THREE.Scene(), []);

  useEffect(() => {
    if (!sceneRef.current && mountRef.current) {
      sceneRef.current = scene;
      scene.background = new THREE.Color(0xbce2e8);

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 20, 300);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;
      mountRef.current.appendChild(renderer.domElement);

      const pointLight1 = new THREE.PointLight(0xffffff, 1, 1000);
      pointLight1.position.set(100, 100, 100);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffffff, 1, 1000);
      pointLight2.position.set(-100, -100, -100);
      scene.add(pointLight2);

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      const waterNormals = new TextureLoader().load("/waternormals.jpeg", (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      });

      const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
      const water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        sunDirection: new THREE.Vector3(0, 0, 0),
        sunColor: 0xffffff,
        waterColor: 0x00aaff,
        distortionScale: 1.5,
        fog: scene.fog !== undefined,
      });

      water.rotation.x = -Math.PI / 2;
      scene.add(water);
      waterRef.current = water;

      // ポストプロセシングのセットアップ
      const composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5, // 強さ
        0.4, // 半径
        0.8  // 閾値
      );
      composer.addPass(bloomPass);

      const filmPass = new FilmPass(0.5, 0.05, 648, false);
      composer.addPass(filmPass);

      composerRef.current = composer;

      // GUIの作成
      createCombinedGUI(water, composer, bloomPass, filmPass, camera);

      const animate = () => {
        requestAnimationFrame(animate);
        water.material.uniforms["time"].value += 1.0 / 60.0;
        composer.render();
      };

      animate();
    }

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current && composerRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        composerRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scene]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};
