// VignetteShader.ts
import * as THREE from 'three';

export const VignetteShader = {
    uniforms: {
      'tDiffuse': { value: null },
      'resolution': { value: new THREE.Vector2(1, 1) },
      'offset': { value: 1.0 }, // フェードのオフセット
      'darkness': { value: 1.5 } // 暗さの強度
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float offset;
      uniform float darkness;
      uniform vec2 resolution;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
  
      void main() {
        // テクスチャから色を取得
        vec4 color = texture2D(tDiffuse, vUv);
        // 中心からの距離を計算
        vec2 position = vUv - vec2(0.5);
        float len = length(position);
        // ビネット効果を適用
        float vignette = smoothstep(0.8, offset, len * darkness);
        color.rgb *= vignette;
        gl_FragColor = color;
      }
    `
  };
  