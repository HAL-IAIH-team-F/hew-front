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

  return (scene: THREE.Scene, Gomis: THREE.Mesh[], riseSpeed: number) => {
    const Gomi = new THREE.Mesh(GomiGeometry, GomiMaterial.clone());

    // 泡の初期位置をランダムに設定
    Gomi.position.x = Math.random() * 800 - 400;
    Gomi.position.y = Math.random() * 400 - 200;
    Gomi.position.z = 0;

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
        z: "+=800",
        duration: 20 / riseSpeed,
        ease: "linear",
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

    // timelineを返す
    return timeline;
  };
})();

export const generateGomi = (
  scene: THREE.Scene,
  Gomis: THREE.Mesh[],
  interval: number,
  riseSpeed: number,
  manager: { value: { animstate: string } }
) => {
  setInterval(() => {
    // Gomiが30個以上ある場合は新しいGomiを生成しない
    if (Gomis.length >= 50) return;

    const timeline = createGlowingGomi(scene, Gomis, riseSpeed);

    if (!timeline) return;

    // animstateの監視
    const watchAnimState = () => {
      if (manager.value.animstate === "onclickBubble") {
        console.log("aaa");
        
        // 速度を1から8に変更（イージング）
        gsap.to(timeline, {
          timeScale: 8,
          duration: 0.5, // 0.5秒かけて速度を変更
          ease: "power2.out" // イージングの種類
        });

        // 1秒後に速度を8から1に戻す
        setTimeout(() => {
          gsap.to(timeline, {
            timeScale: 1,
            duration: 1.0, // 0.5秒かけて元の速度に戻す
            ease: "power2.out" // イージングの種類
          });
        }, 1000);
      }
    };

    // animstateを100ミリ秒ごとに監視
    const animStateInterval = setInterval(watchAnimState, 100);

    // Gomiが削除されたときに監視を停止する
    setTimeout(() => {
      clearInterval(animStateInterval);
    }, 20000); // 20秒後に監視を停止する（任意で調整可能）
  }, interval);
};
