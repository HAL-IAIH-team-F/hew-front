"use client";
import * as THREE from "three";
import { gsap } from "gsap";
import { Canvas, useThree,useFrame } from '@react-three/fiber';
import { useEffect, useRef, useMemo, useState } from 'react';
import { ManagerRef, BubbleMesh, BubblesProps, GlowingGomiProps,EffectsComposerProps } from "../system/interface"

export const GradientBackground: React.FC<{ manager: ManagerRef }> = ({ manager }) => {
    const { scene } = useThree();
    useEffect(() => {
        if (manager.value.animstate === "init")
            createGradientBackground(scene, manager.value.sessionId);
      }, [manager.value.sessionId]);
    return null;
  };

export const createGradientBackground = (scene: THREE.Scene, sessionId: number) => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const newColor1 = new THREE.Color(0x256b85);
    const newColor2 = new THREE.Color(0x256b93);
    const newColor3 = new THREE.Color(0x000327);
    const newGradientRadius = sessionId * 0.4 + 0.5;
    
    // Calculate blend factor based on sessionId
    const blendFactor = Math.min(sessionId / 50, 1.0); // Clamp blend factor between 0 and 1

    const blendedColor1 = newColor1.clone().lerp(newColor3, blendFactor);
    const blendedColor2 = newColor2.clone().lerp(newColor3, blendFactor);
    console.log("creatbackground %d %d",blendFactor,sessionId)
    const oldBackgroundMesh = scene.getObjectByName("backgroundMesh");
    if (oldBackgroundMesh) {
        console.log(sessionId);
        const material = (oldBackgroundMesh as THREE.Mesh).material as THREE.ShaderMaterial;
        const startColor1 = material.uniforms.color1.value.clone();
        const startColor2 = material.uniforms.color2.value.clone();
        const duration = 2;

        // Animate color1 transition to blendedColor1
        gsap.to(startColor1, {
            r: blendedColor1.r,
            g: blendedColor1.g,
            b: blendedColor1.b,
            duration: duration,
            onUpdate: () => {
                material.uniforms.color1.value.set(startColor1.r, startColor1.g, startColor1.b);
            },
        });

        // Animate color2 transition to blendedColor2
        gsap.to(startColor2, {
            r: blendedColor2.r,
            g: blendedColor2.g,
            b: blendedColor2.b,
            duration: duration,
            onUpdate: () => {
                material.uniforms.color2.value.set(startColor2.r, startColor2.g, startColor2.b);
            },
        });

        // Animate gradientRadius
        gsap.to(material.uniforms.gradientRadius, {
            value: newGradientRadius,
            duration: duration,
        });

    } else {
        const material = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: blendedColor1 },
                color2: { value: blendedColor2 },
                color3: { value: newColor3 },
                gradientRadius: { value: newGradientRadius },
                lightIntensity: { value: 0.1 }, // 光の強度
                lightDirection: { value: new THREE.Vector3(0.5, 0.5, 0.5) }, // 光の3D方向
                time: { value: 0.0 }, // 時間の経過を表すユニフォーム
                distortionStrength: { value: 0.2 }, // ゆらぎの強さ
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
                uniform float lightIntensity;
                uniform vec3 lightDirection;
                uniform float time;
                uniform float distortionStrength;
                varying vec2 vUv;

                // ノイズ関数を追加
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
                    // 水のゆらぎを計算
                    vec2 uvDistorted = vUv + distortionStrength * vec2(
                        sin(vUv.y * 10.0 + time * 2.0 + noise(vUv + time)),
                        cos(vUv.x * 10.0 + time * 2.0 + noise(vUv + time))
                    );

                    float dist = length(uvDistorted - vec2(0.5, 0.5));
                    float mixFactor = smoothstep(0.0, gradientRadius, dist);
                    vec3 color = mix(color1, color2, mixFactor);

                    
                    // 光のビーム効果
                    vec3 lightDir = normalize(lightDirection);
                    vec3 fragPos = vec3(uvDistorted - vec2(0.5, 0.5), 0.0);
                    float lightFactor = dot(fragPos, lightDir);
                    lightFactor = clamp(lightFactor, 0.0, 1.0);
                    lightFactor = pow(lightFactor, 2.0) * lightIntensity;

                    // 色に光の効果を追加
                    color += lightFactor * vec3(1.0, 0.9, 0.7);

                    gl_FragColor = vec4(color, 1.0);
                }
            `,
            depthWrite: false,
        });

        material.uniforms.lightDirection.value.set(0.5, 0.5, 1.0); // Z方向の値を調整
        const backgroundMesh = new THREE.Mesh(geometry, material);
        backgroundMesh.name = "backgroundMesh";
        scene.add(backgroundMesh);

        // アニメーションループで時間を更新
        const animate = () => {
            material.uniforms.time.value += 0.01; // ゆっくりした動き
            requestAnimationFrame(animate);
        };
        animate();
    }
};
