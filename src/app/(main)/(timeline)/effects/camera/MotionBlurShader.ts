// MotionBlurShader.js
import * as THREE from 'three';

export const MotionBlurShader = {
    uniforms: {
      'tDiffuse': { value: null },
      'velocityFactor': { value: 1.0 },
      'prevViewProjectionMatrix': { value: new THREE.Matrix4() },
      'currentViewProjectionMatrix': { value: new THREE.Matrix4() },
      'resolution': { value: new THREE.Vector2() }
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
      uniform float velocityFactor;
      uniform mat4 prevViewProjectionMatrix;
      uniform mat4 currentViewProjectionMatrix;
      uniform vec2 resolution;
  
      varying vec2 vUv;
  
      void main() {
        vec4 currentPos = vec4(vUv * 2.0 - 1.0, 0.0, 1.0);
        vec4 prevPos = prevViewProjectionMatrix * inverse(currentViewProjectionMatrix) * currentPos;
        prevPos /= prevPos.w;
  
        vec2 velocity = (currentPos.xy - prevPos.xy) * velocityFactor;
        vec4 color = texture2D(tDiffuse, vUv + velocity / resolution);
  
        gl_FragColor = color;
      }
    `
  };
  