// filters/effects.ts
import * as THREE from 'three';
import { EffectComposer } from 'three-stdlib';
import { RenderPass } from 'three-stdlib';
import { ShaderPass } from 'three-stdlib';
import { BlurShader } from './BlurShader';
import gsap from 'gsap';
import { initmoveBubblesToPosition } from '@/timeline/bubble/position';
import { Manager } from '@/timeline/manager/manager';

class Effects {
  composer: EffectComposer;
  private horizontalBlurPass: ShaderPass;
  private verticalBlurPass: ShaderPass;
  private camera: THREE.PerspectiveCamera; // カメラをクラスのプロパティに追加

  constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.composer = new EffectComposer(renderer);
    this.camera = camera; // カメラを初期化
    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    // 水平方向のブラー
    this.horizontalBlurPass = new ShaderPass(BlurShader);
    this.horizontalBlurPass.material.uniforms['resolution'].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.horizontalBlurPass.material.uniforms['direction'].value = new THREE.Vector2(0.0, 0.0);
    this.composer.addPass(this.horizontalBlurPass);

    // 垂直方向のブラー
    this.verticalBlurPass = new ShaderPass(BlurShader);
    this.verticalBlurPass.material.uniforms['resolution'].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.verticalBlurPass.material.uniforms['direction'].value = new THREE.Vector2(0.0, 0.0);
    this.composer.addPass(this.verticalBlurPass);
    
  }

  startAnimesion(bubbles: THREE.Mesh[], manager: Manager)
  {
    initmoveBubblesToPosition(bubbles, manager.value.sessionId,"idle",manager);

  }
  clickBubbleAnimesionBlur() {
    // GSAPのタイムラインを作成
    const tl = gsap.timeline();
    // 初期のブラーを0から3に増加させるアニメーション
    tl.to(this.horizontalBlurPass.material.uniforms['direction'].value, {
      x: 0.3,
      duration: 0.5,
      ease: 'power2.out',
    });
  
    tl.to(this.verticalBlurPass.material.uniforms['direction'].value, {
      y: 0.3,
      duration: 0.5,
      ease: 'power2.out',
    }, "<"); // "<"で前のアニメーションと同時に開始

    // FOVを75から83に増加させるアニメーションを追加
    tl.to(this.camera, {
      fov: 90,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.camera.updateProjectionMatrix() // プロジェクションマトリックスを更新
    }, "<");

    // ブラーを3から0に減少させるアニメーション
    tl.to(this.horizontalBlurPass.material.uniforms['direction'].value, {
      x: 0,
      duration: 1,
      ease: 'power2.out',
    });
  
    tl.to(this.verticalBlurPass.material.uniforms['direction'].value, {
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, "<"); // "<"で前のアニメーションと同時に開始

    // FOVを83から75に減少させるアニメーションを追加
    tl.to(this.camera, {
      fov: 75,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => this.camera.updateProjectionMatrix() // プロジェクションマトリックスを更新
    }, "<");
  }
}

export default Effects;
