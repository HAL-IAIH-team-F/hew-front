// filters/BlurShader.ts
import * as THREE from 'three';

export const BlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2(1.0, 1.0) },
    direction: { value: new THREE.Vector2(1.0, 0.0) },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform vec2 direction;
    varying vec2 vUv;

    void main() {
      vec4 color = vec4(0.0);
      float total = 0.0;
      
      // Blur amount, adjust for stronger or weaker blur
      float blurAmount = 5.0;

      for (float i = -4.0; i <= 4.0; i++) {
        vec2 offset = direction * i * blurAmount / resolution;
        color += texture2D(tDiffuse, vUv + offset);
        total += 1.0;
      }

      gl_FragColor = color / total;
    }
  `,
};
