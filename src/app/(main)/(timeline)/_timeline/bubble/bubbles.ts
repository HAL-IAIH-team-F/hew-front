"use client";
import * as THREE from "three";
import {PerspectiveCamera, Scene} from "three";
import {getRandomPosition, getRandomPositionWithExclusion, moveBubblesToPosition} from "./position";
import {gsap} from "gsap";
import {createGradientBackground} from "@/(main)/(timeline)/background/background"
import Effects from "@/(main)/(timeline)/effects/camera/Effects"
import {Manager} from "~/manager/manager";
import {LoadedClientState} from "~/api/context/ClientState";
import fetchTimelineProduct from "@/(main)/(timeline)/_timeline/fetchTimelineProduct";
import {util} from "../../../../../util/util";
import {Img} from "~/api/context/Api";
import {Routes} from "~/route/Routes";
import {BubbleMesh} from "@/(main)/(timeline)/_timeline/bubble/BubbleMesh";

const vertexShader = `
  uniform float time;
  uniform float spikes;
  varying vec2 vUv;

  // パーリンノイズ関数
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vUv = uv;
    vec3 newPosition = position;

    // ノイズを使って頂点位置を変形
    float noiseValue = noise(newPosition.xy * spikes + time); // spikesを使ってノイズの周波数を制御
    float ratio = noiseValue * 0.05 + 0.98; // ratioを計算

    // 中心からの距離に基づいて縮小率を計算
    float dist = length(newPosition.xy);
    float shrinkFactor = smoothstep(0.37, 0.5, dist); // 距離によって縮小率を調整

    // 縮小率を適用して位置を内側に移動
    newPosition *= mix(1.0, 0.8, shrinkFactor); // 0.8は縮小率の例

    // ノイズによる変形を適用
    newPosition *= ratio;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D map;
  varying vec2 vUv;
  uniform float time;

  void main() {
    vec4 originalColor = texture2D(map, vUv);
    float dist = length(vUv - 0.5); // 中心からの距離

    // 泡の外縁のグラデーションを追加
    float outerGlow = smoothstep(0.45, 0.5, dist);
    vec3 glowColor = vec3(0.2, 0.5, 0.8); // 外縁の色を調整（より控えめな青系に）

    // 円形にクリッピングするためのアルファ値の計算
    float alpha = 1.0 - smoothstep(0.48, 0.5, dist);

    // 泡の内部に動きのある歪みを追加
    vec2 distortion = vec2(
      sin(time * 2.0 + dist * 12.0) * 0.004, 
      cos(time * 2.0 + dist * 12.0) * 0.004
    );
    vec2 uvDistorted = vUv + distortion;

    vec4 distortedColor = texture2D(map, uvDistorted);

    // 泡の色を歪みとアルファ値に応じて調整
    vec4 color = mix(originalColor, distortedColor, alpha);

    // 泡の表面の輝き（ハイライト）を追加
    float highlight = smoothstep(0.45, 0.48, dist) * 0.2; // ハイライトの影響を減らす
    color.rgb += vec3(1.0) * highlight;

    // 最終的な色の出力、外縁のグロウ効果を追加
    color.rgb += glowColor * outerGlow;
    gl_FragColor = vec4(color.rgb, alpha * originalColor.a);
  }
`;


const errTexture = "/109671135_p2_master1200.webp"
export const createBubbles = async (
    scene: THREE.Scene, bubblecnt: number, sessionId: number, bubbles: BubbleMesh[], camera: THREE.PerspectiveCamera,
    clientState: LoadedClientState,
) => {
    const textureLoader = new THREE.TextureLoader();
    const result = await fetchTimelineProduct(clientState, bubblecnt)
    if (result.error) {
        console.error(result.error)
        throw new Error(util.createErrorMessage(result.error))
    }
    for (const product of result.success) {
        // const txrpath = txr[0][0]
        // const txrpath = txr[i][0]
        const imgResult = await Img.create(product.product_thumbnail_uuid, null)
        let txrpath;
        if (imgResult.error) {
            console.error(imgResult.error)
            txrpath = errTexture
        } else {
            txrpath = imgResult.success.strUrl()
        }
        const bubbleTexture = textureLoader.load(txrpath);
        const bubbleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: {value: 0.0},
                spikes: {value: 0.25},
                map: {value: bubbleTexture},
            },
            vertexShader,
            fragmentShader,
            transparent: true,
        });

        const bubbleGeometry = new THREE.CircleGeometry(15, 32);
        const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial) as any as BubbleMesh;

        const scale = Math.random() * 0.5 + 0.6;
        bubble.scale.set(scale, scale, scale);

        let overlap = true;
        while (overlap) {
            const {x: newX, y: newY} = getRandomPositionWithExclusion(
                -400, 400,
                -200, 200,
                bubbles,
                50,
                scale,
                sessionId
            );
            bubble.position.x = newX;
            bubble.position.y = newY;
            bubble.position.z = getRandomPosition(-1500, -200, -800, -300);

            overlap = bubbles.some((otherBubble) => {
                if (!otherBubble) return false;
                const dx = bubble.position.x - otherBubble.position.x;
                const dy = bubble.position.y - otherBubble.position.y;
                const dz = bubble.position.z - otherBubble.position.z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                const bubbleRadius = 20 * scale;
                const otherBubbleRadius = 20 * otherBubble.scale.x;

                return distance < bubbleRadius + otherBubbleRadius + 10;
            });
        }
        bubble.texturePath = txrpath;
        bubble.sessionId = sessionId;
        bubble.bubbleId = bubbles.length;
        bubble.productRes = product;

        scene.add(bubble);
        bubbles.push(bubble);

        bubble.scale.set(0, 0, 0);
        gsap.to(bubble.scale, {
            x: scale,
            y: scale,
            z: scale,
            duration: 2,
            ease: 'elastic.out(1, 0.75)',
        });

        const randomRotationSpeed = Math.random() * 0.01 + 0.01;
        // noinspection PointlessArithmeticExpressionJS
        const randomAmplitude = Math.random() * 1 + 0.05;
        // noinspection PointlessArithmeticExpressionJS
        const randomDuration = Math.random() * 1 + 0.5;

        const rotationAnimation = gsap.to(bubble.rotation, {
            x: `+=${randomRotationSpeed}`,
            y: `+=${randomRotationSpeed}`,

            duration: randomDuration,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
            paused: true,
        });

        const positionAnimation = gsap.to(bubble.position, {
            y: `+=${randomAmplitude}`,
            x: `+=${randomAmplitude}`,
            duration: randomDuration,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
            paused: true,
        });

        const startBubbleAnimation = () => {

            rotationAnimation.play();
            positionAnimation.play();
        };

        const stopBubbleAnimation = () => {
            rotationAnimation.pause();
            positionAnimation.pause();
        };

        startBubbleAnimation();

        (bubble).startAnimation = startBubbleAnimation;
        (bubble).stopAnimation = stopBubbleAnimation;

        const animateBubble = () => {
            bubbleMaterial.uniforms.time.value += 0.01;
            requestAnimationFrame(animateBubble);
            bubble.lookAt(camera.position);
        };
        animateBubble();

    }

    return bubbles;
};

export const onClickBubble = (
    manager: Manager, event: MouseEvent, bubbles: BubbleMesh[], camera: PerspectiveCamera, scene: Scene,
    effects: Effects, clientState: LoadedClientState, routes: Routes
) => {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(bubbles);

    if (intersects.length > 0) {
        const clickedBubble = intersects[0].object as BubbleMesh;

        (clickedBubble).stopAnimation();
        if ((clickedBubble).bubbleId == 999) {
            console.log(manager.value.animstate);
            if (manager.value.animstate != "product") {
                // showProduct(clickedBubble, scene, camera, manager, effects)
                // manager.update.animstate("product");
                routes.timeline().setProductId(clickedBubble.productRes.product_id).transition()
            }
        } else {
            if (manager.value.animstate == "idle") {
                manager.update.animstate("onclickBubble")
                createGradientBackground(scene, manager.value.sessionId);
                effects.clickBubbleAnimesion()

                gsap.to(clickedBubble.position, {
                    x: 0,
                    y: camera.position.y,
                    z: camera.position.z - 200,
                    duration: 1.5,
                    ease: "power2.inOut",
                });
                gsap.to(clickedBubble.scale, {
                    x: 3.3,
                    y: 3.3,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        (clickedBubble).bubbleId = 999;
                        manager.update.sessionId(manager.value.sessionId + 1);
                        createBubbles(
                            scene, manager.value.bbnum - 1, manager.value.sessionId, bubbles, camera, clientState
                        ).then((newBubbles) => {
                            moveBubblesToPosition(newBubbles, manager.value.sessionId);
                        });
                    },
                });

                bubbles.forEach((bubble) => {
                    const bubbleMesh = bubble as BubbleMesh;
                    if (bubble !== clickedBubble) {
                        (bubbleMesh).stopAnimation();
                        gsap.to(bubble.position, {
                            y: bubble.position.y,
                            z: bubble.position.z + 350,
                            duration: Math.random() * 0.4 + 1,
                            ease: "power4.inOut"
                        });

                        gsap.to(bubble.material, {
                            opacity: 0,
                            duration: 3,
                            ease: "power2.inOut",
                            onComplete: () => {
                                scene.remove(bubble);
                                const bubbleIndex = bubbles.indexOf(bubble);
                                if (bubbleIndex !== -1) {
                                    bubbles.splice(bubbleIndex, 1);
                                }
                                manager.update.animstate("idle")

                            },
                        });
                    }
                });
            } else {
                console.log(manager.value.animstate)
            }
        }
    }
};


// const fragmentShaderold = `
//   uniform sampler2D map;
//   varying vec2 vUv;
//   uniform float time;
//   void main() {
//     vec4 originalColor = texture2D(map, vUv);
//     vec4 color = originalColor;
//     float dist = length(vUv - 0.5); // 中心からの距離
//
//     // 泡のエッジを透明にするためのアルファ調整
//     float edgeAlpha = smoothstep(0.45, 0.5, dist);
//
//     // 泡の内部に動きのある歪みを追加
//     vec2 distortion = vec2(
//       sin(time + dist * 15.0) * 0.01,
//       cos(time + dist * 15.0) * 0.01
//     );
//     vec2 uvDistorted = vUv + distortion;
//
//     // 泡の表面にノイズによる微細な歪みを追加
//     float noise = sin(dot(uvDistorted * 10.0, vec2(12.9898, 78.233)) * 43758.5453);
//     uvDistorted += noise * 0.005;
//
//     vec4 distortedColor = texture2D(map, uvDistorted);
//
//     // 泡の深さ感を追加
//     float depth = 1.0 - smoothstep(0.0, 0.3, dist);
//     color.rgb *= 0.7 + 0.3 * depth;
//
//     // 泡の内側の淡い色と透明感
//     vec3 innerColor = vec3(0.9, 0.95, 1.0);
//     float innerBlend = smoothstep(0.0, 0.1, dist);
//     color.rgb = mix(innerColor, distortedColor.rgb, innerBlend);
//
//     // 泡のエッジに輝きを追加
//     vec3 glowColor = vec3(0.8, 0.9, 1.0);
//     float glow = exp(-pow((dist - 0.4) * 15.0, 2.0)) * 0.8;
//     color.rgb += glowColor * glow;
//
//     // 光の屈折と反射の効果を増やす
//     float reflection = sin(dist * 16.0 + time * 4.0) * 0.06;
//     color.rgb += reflection * glowColor;
//
//     // 泡の表面にシャープなハイライトを追加
//     float highlight = smoothstep(0.48, 0.5, dist) * 0.3;
//     color.rgb += highlight * vec3(1.0, 1.0, 1.0);
//
//     // 泡の透明感を調整
//     color.a = max(originalColor.a, glow * 0.4); // 透明度を調整
//
//     if (color.a < 0.05) discard;
//
//     gl_FragColor = color;
//   }
// `;