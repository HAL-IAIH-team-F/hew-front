import * as THREE from 'three';
import {PerspectiveCamera, Vector2} from 'three';
import {EffectComposer, RenderPass, ShaderPass} from 'three-stdlib';
import {BlurShader} from './BlurShader';
import gsap from 'gsap';
import {initmoveBubblesToPosition} from '@/(main)/timeline/bubble/position';
import {Manager} from "~/manager/manager";


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

  startAnimesion(bubbles: THREE.Mesh[], manager: Manager) {
    const tl = gsap.timeline();
    
    initmoveBubblesToPosition(bubbles, manager.value.sessionId, "idle", manager);
    
    tl.to(this.horizontalBlurPass.material.uniforms['direction'].value, {
      x: 0.5,
      duration: 0.5,
      ease: 'power2.out',
    });

    tl.to(this.verticalBlurPass.material.uniforms['direction'].value, {
      y: 0.5,
      duration: 0.5,
      ease: 'power2.out',
    }, "<");
    tl.to(this.camera, {
      fov: 70,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.camera.updateProjectionMatrix()
    }, "<");

    


    tl.to(this.horizontalBlurPass.material.uniforms['direction'].value, {
      x: 0,
      duration: 1,
      ease: 'power2.out',
    });
    tl.to(this.verticalBlurPass.material.uniforms['direction'].value, {
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, "<");
    tl.to(this.camera, {
      fov: 75,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => this.camera.updateProjectionMatrix()
    }, "<");


  }

  clickBubbleAnimesion() {
    const tl = gsap.timeline();
    tl.to(this.horizontalBlurPass.material.uniforms['direction'].value, {
      x: 0.3,
      duration: 0.5,
      ease: 'power2.out',
    });

    tl.to(this.verticalBlurPass.material.uniforms['direction'].value, {
      y: 0.3,
      duration: 0.5,
      ease: 'power2.out',
    }, "<");
    tl.to(this.camera, {
      fov: 90,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.camera.updateProjectionMatrix()
    }, "<");
    tl.to(this.horizontalBlurPass.material.uniforms['direction'].value, {
      x: 0,
      duration: 1,
      ease: 'power2.out',
    });
    tl.to(this.verticalBlurPass.material.uniforms['direction'].value, {
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, "<");
    tl.to(this.camera, {
      fov: 63,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.camera.updateProjectionMatrix()
    }, "<");
    tl.to(this.camera, {
      fov: 75,
      duration: 3,
      ease: 'power2.out',
      onUpdate: () => this.camera.updateProjectionMatrix()
    },);
  }

  nextAnimation(
    camera: PerspectiveCamera,
    htmlBox: HTMLElement,
    max: number,
    setCurrent: (tl: gsap.core.Timeline, value: number) => void,
    current?: number,
    change?: number,
  ) {
    if (current === undefined) current = 1000;
    if (change === undefined) change = 0.06;
    if (current <= 0) return
    current -= change;
    if (current > 140) change *= 1.09
    else {
      change *= 0.4
      if (change < 1) change = 1
    }


    if (current < 0) current = 0

    const tl = gsap.timeline({
      onComplete: () => {
        this.nextAnimation(camera, htmlBox, max, setCurrent, current, change)
      }
    });
    setCurrent(tl, max * current / 1000)
  }

  productAnimesionOpen(camera: THREE.PerspectiveCamera, clickedBubble: THREE.Mesh, htmlBox: HTMLElement) {
    this.nextAnimation(camera, htmlBox, 800, (tl, value) =>
      tl.to(htmlBox, {
        right: `-${value}px`,
        opacity: 1,
        duration: 0.01,
        ease: "power2.out",
      }, "<"))
    const y = camera.getViewSize(200, new Vector2(camera.position.x, camera.position.y)).y / 3
    this.nextAnimation(camera, htmlBox, y, (tl, value) =>
      tl.to(camera.position, {
        x: y - value,
        duration: 0.01,
        ease: 'power2.out',
      })
    )

  }
}

export default Effects;
