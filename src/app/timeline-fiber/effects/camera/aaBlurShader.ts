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

      // Debug Step 1: Output a solid color to check if the shader is working
      // Uncomment the line below to check
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Should render the screen in red
      return; 

      // Debug Step 2: Sample the original texture directly
      // Uncomment the line below to check if the texture is correctly applied
      // gl_FragColor = texture2D(tDiffuse, vUv);
      // return;

      // Main blur calculation loop
      for (float i = -4.0; i <= 4.0; i++) {
        vec2 offset = direction * i * blurAmount / resolution;
        color += texture2D(tDiffuse, vUv + offset);
        total += 1.0;
      }

      // Debug Step 3: Output the accumulated color before dividing by total
      // Uncomment the line below to see the color value before normalization
      // gl_FragColor = vec4(color.rgb, 1.0);
      // return;

      // Debug Step 4: Output the total to check the number of samples
      // Uncomment the line below to visualize the total value
      // float brightness = total / 9.0; // Since the loop goes from -4.0 to 4.0 (9 iterations)
      // gl_FragColor = vec4(vec3(brightness), 1.0);
      // return;

      // Divide accumulated color by the total number of samples to get the average
      gl_FragColor = vec4(color.rgb / total, 1.0);
    }
  `,
};
