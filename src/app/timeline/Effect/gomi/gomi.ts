"use client";
import * as THREE from "three";
import { gsap } from "gsap";

export const createGlowingGomi = (() => {
    const GomiGeometry = new THREE.SphereGeometry(10, 16, 16);
    const GomiMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });
  
    return (scene: THREE.Scene, Gomis: THREE.Mesh[],riseSpeed: number) => {
      const Gomi = new THREE.Mesh(GomiGeometry, GomiMaterial.clone());
  
      // 泡の初期位置をランダムに設定
      Gomi.position.x = Math.random() * 800 - 400;
      Gomi.position.y = Math.random() * 400 - 200;
      Gomi.position.z = 0
  
      // 泡のサイズをランダムに縮小
      const scale = 0.05;
      Gomi.scale.set(scale, scale, scale);
  
      // シーンに泡を追加
      scene.add(Gomi);
      Gomis.push(Gomi);
  
      const animateGomi = () => {
        // Z方向に上昇させるアニメーション
        gsap.to(Gomi.position, {
          z: "+=800",
          duration: 20 / riseSpeed,
          ease: "linear",
          onComplete: () => {
            // 上昇完了後に泡をシーンと配列から削除
            scene.remove(Gomi);
            const index = Gomis.indexOf(Gomi);
            if (index > -1) {
              Gomis.splice(index, 1);
            }
          },
        });
      };
  
      // 泡の光るエフェクト (フェードイン・フェードアウト)
      gsap.to(Gomi.material, {
        opacity: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
  
      // アニメーションを開始
      animateGomi();
    };
  })();
  
export const generateGomi = (scene: THREE.Scene, Gomis: THREE.Mesh[], interval: number,riseSpeed: number) => {
    setInterval(() => {
      createGlowingGomi(scene, Gomis,riseSpeed);
    }, interval);
  };