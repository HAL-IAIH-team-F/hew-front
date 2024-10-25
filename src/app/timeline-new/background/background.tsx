"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Extend react-three-fiber to include PlaneBufferGeometry
extend({ PlaneBufferGeometry: THREE.PlaneGeometry });

interface GradientBackgroundProps {
  sessionId: number;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ sessionId }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const newColor1 = new THREE.Color(0x256b85);
  const newColor2 = new THREE.Color(0x256b93);
  const newColor3 = new THREE.Color(0x000327);
  const gradientRadius = sessionId * 0.4 + 0.5;
  const blendFactor = Math.min(sessionId / 50, 1.0);

  const blendedColor1 = newColor1.clone().lerp(newColor3, blendFactor);
  const blendedColor2 = newColor2.clone().lerp(newColor3, blendFactor);

  const fragmentShader = `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float gradientRadius;
    uniform float lightIntensity;
    uniform vec3 lightDirection;
    uniform float time;
    uniform float distortionStrength;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uvDistorted = vUv + distortionStrength * vec2(
        sin(vUv.y * 10.0 + time * 2.0 + noise(vUv + time)),
        cos(vUv.x * 10.0 + time * 2.0 + noise(vUv + time))
      );

      float dist = length(uvDistorted - vec2(0.5, 0.5));
      float mixFactor = smoothstep(0.0, gradientRadius, dist);
      vec3 color = mix(color1, color2, mixFactor);

      vec3 lightDir = normalize(lightDirection);
      vec3 fragPos = vec3(uvDistorted - vec2(0.5, 0.5), 0.0);
      float lightFactor = dot(fragPos, lightDir);
      lightFactor = clamp(lightFactor, 0.0, 1.0);
      lightFactor = pow(lightFactor, 2.0) * lightIntensity;

      color += lightFactor * vec3(1.0, 0.9, 0.7);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    color1: { value: blendedColor1 },
    color2: { value: blendedColor2 },
    gradientRadius: { value: gradientRadius },
    lightIntensity: { value: 0.1 },
    lightDirection: { value: new THREE.Vector3(0.5, 0.5, 1.0) },
    time: { value: 0.0 },
    distortionStrength: { value: 0.2 },
  }), [blendedColor1, blendedColor2, gradientRadius]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += 0.01;
    }
  });

  return (
    <mesh renderOrder={-1}>
      <planeBufferGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
};

export default function Background({ sessionId }: { sessionId: number }) {
  return (

      <GradientBackground sessionId={sessionId} />
  );
}
