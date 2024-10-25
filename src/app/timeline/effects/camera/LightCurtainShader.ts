// filters/GodrayShader.ts
import * as THREE from 'three';

// LightCurtainShader.js
export const LightCurtainShader = {
    uniforms: {
      'time': { value: 0.0 },
      'resolution': { value: new THREE.Vector2() },
      'intensity': { value: 1.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 resolution;
      uniform float intensity;
  
      varying vec2 vUv;
  
      void main() {
        // UV座標を使って光の縞模様を生成
        float wave = sin(vUv.y * 10.0 + time * 2.0) * 0.5 + 0.5;
        float curtain = smoothstep(0.2, 0.8, wave) * intensity;
  
        // 光の色と強度を設定
        vec3 color = vec3(0.8, 0.9, 1.0) * curtain;
  
        gl_FragColor = vec4(color, 1.0);
      }
    `
  };