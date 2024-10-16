"use client";
import * as THREE from "three";
import { gsap } from "gsap";

export const createGradientBackground = (scene: THREE.Scene, sessionId: number) => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const newColor1 = new THREE.Color(0x001f33);
    const newColor2 = new THREE.Color(0x0077be);
    const newGradientRadius = sessionId * 0.2 + 0.5;
  
    const oldBackgroundMesh = scene.getObjectByName("backgroundMesh");
    if (oldBackgroundMesh) {
      console.log(sessionId)
      const material = (oldBackgroundMesh as THREE.Mesh).material as THREE.ShaderMaterial;
  
      const startColor1 = material.uniforms.color1.value.clone();
      const startColor2 = material.uniforms.color2.value.clone();
  
      const duration = 2;
  
      gsap.to(startColor1, {
        r: newColor1.r,
        g: newColor1.g,
        b: newColor1.b,
        duration: duration,
        onUpdate: () => {
          material.uniforms.color1.value.set(startColor1.r, startColor1.g, startColor1.b);
        },
      });
  
      gsap.to(startColor2, {
        r: newColor2.r,
        g: newColor2.g,
        b: newColor2.b,
        duration: duration,
        onUpdate: () => {
          material.uniforms.color2.value.set(startColor2.r, startColor2.g, startColor2.b);
        },
      });
  
      gsap.to(material.uniforms.gradientRadius, {
        value: newGradientRadius,
        duration: duration,
      });
  
    } else {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          color1: { value: newColor1 },
          color2: { value: newColor2 },
          gradientRadius: { value: newGradientRadius },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float gradientRadius;
          varying vec2 vUv;
          void main() {
            float dist = length(vUv - vec2(0.5, 0.5));
            float mixFactor = smoothstep(0.0, gradientRadius, dist);
            vec3 color = mix(color1, color2, mixFactor);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        depthWrite: false,
      });
  
      const backgroundMesh = new THREE.Mesh(geometry, material);
      backgroundMesh.name = "backgroundMesh";
      scene.add(backgroundMesh);
    }
  };