"use client";
import * as THREE from "three";
import { gsap } from "gsap";
import { ManagerRef, BubbleMesh, BubblesProps, GlowingGomiProps,EffectsComposerProps } from "../../system/interface"
import { Canvas, useThree,useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo, useState } from 'react';

export const GlowingGomi: React.FC<GlowingGomiProps> = ({ manager, glowingGomiRef }) => {
  const { scene } = useThree();
  useEffect(() => {
    generateGomi(scene, glowingGomiRef.current, 300, manager.value.riseSpeed, manager);
  }, [scene, manager, glowingGomiRef]);
  return null;
};

export const createGlowingGomi = (() => {
  const GomiGeometry = new THREE.SphereGeometry(10, 16, 16);
  const GomiMaterial = new THREE.MeshBasicMaterial({
    color: 0xbce2e8,
    transparent: true,
    opacity: 0.4,
  });

  return (scene: THREE.Scene, Gomis: THREE.Mesh[], riseSpeed: number) => {
    const Gomi = new THREE.Mesh(GomiGeometry, GomiMaterial.clone());

    // 泡の初期位置をランダムに設定
    Gomi.position.x = Math.random() * 800 - 400;
    Gomi.position.y = Math.random() * 400 - 200;
    Gomi.position.z = Math.random() * 400 - 200;

    // 泡のサイズをランダムに縮小
    const scale = 0.05;
    Gomi.scale.set(scale, scale, scale);

    // シーンに泡を追加
    scene.add(Gomi);
    Gomis.push(Gomi);

    let timeline: gsap.core.Timeline | undefined;

    const animateGomi = () => {
      // gsap.timelineを使用してアニメーションを作成
      timeline = gsap.timeline({
        onComplete: () => {
          // 上昇完了後に泡をシーンと配列から削除
          scene.remove(Gomi);
          const index = Gomis.indexOf(Gomi);
          if (index > -1) {
            Gomis.splice(index, 1);
          }
        },
      });

      // Z方向に上昇させるアニメーションを追加
      timeline.to(Gomi.position, {
        z: "+=500",
        duration: 100 / riseSpeed,
        ease: "linear",
      });
    };

    // ランダムな揺れを永続的にアニメーション
    const randomizePosition = () => {
      gsap.to(Gomi.position, {
        x: `+=${Math.random() * 40 - 20}`, // ランダムな範囲で揺れる
        y: `+=${Math.random() * 40 - 20}`, // ランダムな範囲で揺れる
        duration: 2,
        ease: "sine.inOut",
        onComplete: randomizePosition, // アニメーション完了時に再度実行
      });
    };
    randomizePosition();

    // アニメーションを開始
    animateGomi();

    // timelineを返す
    return timeline;
  };
})();

export const generateGomi = (
  scene: THREE.Scene,
  Gomis: THREE.Mesh[],
  interval: number,
  riseSpeed: number,
  manager: { value: { animstate: string } },
) => {
  setInterval(() => {
    // Gomiが30個以上ある場合は新しいGomiを生成しない
    if (Gomis.length >= 100) return;

    const timeline = createGlowingGomi(scene, Gomis, riseSpeed);

    if (!timeline) return;

    // animstateの監視
    const watchAnimState = () => {
      if (manager.value.animstate === "init" || manager.value.animstate === "onclickBubble") {
        // 速度を変更
        gsap.to(timeline, {
          timeScale: 30,
          duration: 0.5,
          ease: "power2.out",
        });

        // 1秒後に速度を戻す
        setTimeout(() => {
          gsap.to(timeline, {
            timeScale: 1,
            duration: 1.5,
            ease: "power2.out",
          });
        }, 1000);
      }
    };

    // animstateを100ミリ秒ごとに監視
    const animStateInterval = setInterval(watchAnimState, 100);

    // Gomiが削除されたときに監視を停止する
    setTimeout(() => {
      clearInterval(animStateInterval);
    }, 20000);
  }, interval);
};
