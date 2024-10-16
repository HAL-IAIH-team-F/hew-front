"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

let sessionId = 1;
let originalCameraPosition: THREE.Vector3 | null = null;
const bbnum = 20;
let fpshigh = 60;
let fpslow = 0;
let lastFrameTimeHigh = 0;
let lastFrameTimeLow = 0;
let riseSpeed = 10; // 上昇速度を調整できる変数
let animstate = "idle"


const getRandomPosition = (min: number, max: number, excludeMin: number, excludeMax: number) => {
  let pos = Math.random() * (max - min) + min;
  while (pos > excludeMin && pos < excludeMax) {
    pos = Math.random() * (max - min) + min;
  }
  return pos;
};
// 新しい関数: 光る泡を生成し、Z方向に上昇後、下に戻る処理を追加
const createGlowingGomi = (() => {
  // ジオメトリとマテリアルを一度だけ作成して使いまわす
  const GomiGeometry = new THREE.SphereGeometry(10, 16, 16);
  const GomiMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.7,
  });

  return (scene: THREE.Scene, Gomis: THREE.Mesh[]) => {
    const Gomi = new THREE.Mesh(GomiGeometry, GomiMaterial.clone());

    // 泡の初期位置をランダムに設定
    Gomi.position.x = Math.random() * 800 - 400;
    Gomi.position.y = Math.random() * 400 - 200;
    Gomi.position.z = 0

    // 泡のサイズをランダムに縮小
    const scale = 0.05;
    Gomi.scale.set(scale, scale, scale);

    // シーンに泡を追加
    scene.add(Gomi);
    Gomis.push(Gomi);

    const animateGomi = () => {
      // Z方向に上昇させるアニメーション
      gsap.to(Gomi.position, {
        z: "+=800",
        duration: 20 / riseSpeed,
        ease: "linear",
        onComplete: () => {
          // 上昇完了後に泡をシーンと配列から削除
          scene.remove(Gomi);
          const index = Gomis.indexOf(Gomi);
          if (index > -1) {
            Gomis.splice(index, 1);
          }
        },
      });
    };

    // 泡の光るエフェクト (フェードイン・フェードアウト)
    gsap.to(Gomi.material, {
      opacity: 1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // アニメーションを開始
    animateGomi();
  };
})();

const generateGomi = (scene: THREE.Scene, Gomis: THREE.Mesh[], interval: number) => {
  setInterval(() => {
    createGlowingGomi(scene, Gomis);
  }, interval);
};

const getRandomPositionWithExclusion = (minX: number,maxX: number,minY: number,maxY: number,bubbles: THREE.Mesh[],exclusionRadius: number,scale: number) => {
  let posX: number | undefined;
  let posY: number | undefined;
  let tooClose = true;

  const buffer = 20 * scale; 

  while (tooClose) {
    posX = Math.random() * (maxX - minX - 2 * buffer) + minX + buffer;
    posY = Math.random() * (maxY - minY - 2 * buffer) + minY + buffer;

    if (sessionId !== 1) {
      while (posX > -100 && posX < 100 && posY > -100 && posY < 100) {
        posX = Math.random() * (maxX - minX - 2 * buffer) + minX + buffer;
        posY = Math.random() * (maxY - minY - 2 * buffer) + minY + buffer;
      }
    }

    tooClose = bubbles.some((otherBubble) => {
      if (!otherBubble || posX === undefined || posY === undefined) {
        return false;
      }
      const dx = posX - otherBubble.position.x;
      const dy = posY - otherBubble.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < exclusionRadius;
    });
  }

  return { x: posX!, y: posY! };
};

const createBubbles = (scene: THREE.Scene,bubblecnt: number,sessionid: number,bubbles: THREE.Mesh[]) => {
  const textureLoader = new THREE.TextureLoader();

  for (let i = 0; i < bubblecnt; i++) {
    const bubbleTexture = textureLoader.load('/icon.png');
    const bubbleMaterial = new THREE.MeshBasicMaterial({
      map: bubbleTexture,
      transparent: true,
      opacity: 0.9,
    });

    const bubbleGeometry = new THREE.CircleGeometry(20, 32);
    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

    const scale = Math.random() * 0.5 + 0.5;
    bubble.scale.set(scale, scale, scale);

    let overlap = true;
    while (overlap) {
      const { x: newX, y: newY } = getRandomPositionWithExclusion(
        -400, 400, 
        -200, 200, 
        bubbles,
        50, 
        scale 
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

    (bubble as any).sessionId = sessionid;
    (bubble as any).bubbleId = bubbles.length;

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

    const randomRotationSpeed = Math.random() * 0.05 + 0.01;
    const randomAmplitude = Math.random() * 1 + 0.1;
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

    (bubble as any).startAnimation = startBubbleAnimation;
    (bubble as any).stopAnimation = stopBubbleAnimation;
  }

  return bubbles;
};

const moveBubblesToPosition = (bubbles: THREE.Mesh[], currentSessionId: number) => {
  bubbles.forEach((bubble) => {
    if ((bubble as any).sessionId === currentSessionId) {
      gsap.to(bubble.position, {
        z: 200,
        duration: Math.random() * 1.5 + 1.5,
        ease: 'power2.out',
      });
    }
  });
};

const createGradientBackground = (scene: THREE.Scene, sessionId: number) => {
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

const DeepSeaScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bubblesRef = useRef<THREE.Mesh[]>([]);
  const glowingGomiRef = useRef<THREE.Mesh[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (!sceneRef.current && mountRef.current) {
      
      const scene = new THREE.Scene();
      createGradientBackground(scene, sessionId);
      

      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 500;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;

      mountRef.current.appendChild(renderer.domElement);
      generateGomi(scene, glowingGomiRef.current, 300);
      bubblesRef.current = createBubbles(scene, bbnum, sessionId, []);

      moveBubblesToPosition(bubblesRef.current, sessionId);

      const animateHighFPS = (time: number) => {
        requestAnimationFrame(animateHighFPS);

        const currentTime = time / 1000;
        const deltaTime = currentTime - lastFrameTimeHigh;

        if (deltaTime >= 1 / fpshigh) {
          lastFrameTimeHigh = currentTime;

          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        }
      };

      const animateLowFPS = (time: number) => {
        requestAnimationFrame(animateLowFPS);

        const currentTime = time / 1000;
        const deltaTime = currentTime - lastFrameTimeLow;

        if (deltaTime >= 1 / fpslow) {
          lastFrameTimeLow = currentTime;
        }
      };

      animateHighFPS(0);
      animateLowFPS(0);
    }

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const handleClick = (event: MouseEvent,) => {
      if (sceneRef.current && cameraRef.current && bubblesRef.current && animstate == "idle" && rendererRef.current) {
        setIsAnimating(true);
        onClickBubble(event, bubblesRef.current, cameraRef.current, sceneRef.current,setIsAnimating);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, [isAnimating]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

const onClickBubble = (
  event: MouseEvent,
  bubbles: THREE.Mesh[],
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  setIsAnimating: (animating: boolean) => void,
) => {
  if (!originalCameraPosition) {
    originalCameraPosition = camera.position.clone();
  }
  
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(bubbles);

  if (intersects.length > 0) {
    const clickedBubble = intersects[0].object as THREE.Mesh;
    animstate = "onClickBubble";
    
    (clickedBubble as any).stopAnimation();

    if ((clickedBubble as any).bubbleId == 999)
    {
      if (animstate != "product")
      {
        showProduct(clickedBubble,scene,camera)
        animstate = "product"
      }
      
    }else{
      createGradientBackground(scene, sessionId);
      gsap.to(clickedBubble.position, {
        x: camera.position.x,
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
          (clickedBubble as any).bubbleId = 999;
          sessionId += 1;
          const newBubbles = createBubbles(scene, bbnum - 1, sessionId, bubbles);
          moveBubblesToPosition(newBubbles, sessionId);

          setIsAnimating(false);
        },
      });

      bubbles.forEach((bubble) => {
        if (bubble !== clickedBubble) {
          (bubble as any).stopAnimation();
          gsap.to(bubble.position, {
            y: bubble.position.y,
            z: bubble.position.z + 300,
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
              animstate = "idle"
            },
          });
        }
      });
    }
  }
};

const showProduct = (clickedBubble: THREE.Mesh, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
  gsap.to(clickedBubble.position, {
    x: camera.position.x - 80,
    y: camera.position.y,
    z: camera.position.z - 200,
    duration: 1.5,
    ease: "power2.inOut",
  });

  // Create geometry and material
  const boxGeometry = new THREE.PlaneGeometry(400, 200);
  const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x95CCFF,
    transparent: true,
    opacity: 0, // Initially transparent
  });

  const box = new THREE.Mesh(boxGeometry, boxMaterial);

  // Create a group and add the box to it
  const group = new THREE.Group();
  group.add(box);

  box.position.x = 150;

  group.position.set(camera.position.x - 150, camera.position.y, camera.position.z - 250);

  const closeButtonTexture = new THREE.TextureLoader().load('/close.png');
  const closeButtonMaterial = new THREE.SpriteMaterial({ map: closeButtonTexture });
  const closeButton = new THREE.Sprite(closeButtonMaterial);

  closeButton.scale.set(15, 15, 1);
  closeButton.position.set(330, 80, 0.1);

  group.add(closeButton);

  group.scale.set(0, 1, 1);
  scene.add(group);
  gsap.timeline({
    onComplete: function() {
    gsap.to(htmlBox.style, {
      opacity: 1, // Fade in
      duration: 1.5, // Same duration as the 3D box
      ease: "power2.out",
    });
    }
  })
  .to(group.scale, { x: 1, duration: 1, ease: "power2.out" })
  .to(box.material, { opacity: 1, duration: 1.5, ease: "power2.out" }, "<");


  // Add HTML box at the same position as the 3D box
  const htmlBox = document.createElement('div');
  htmlBox.style.position = 'absolute';
  htmlBox.style.width = '400px';
  htmlBox.style.height = '200px';
  htmlBox.style.backgroundColor = 'rgba(255, 8, 255, 0)';
  htmlBox.style.borderRadius = '10px';
  htmlBox.style.padding = '20px';
  htmlBox.style.display = 'flex';
  htmlBox.style.justifyContent = 'center';
  htmlBox.style.alignItems = 'center';
  htmlBox.style.opacity = '0'; // Initially hidden
  htmlBox.innerHTML = '<p>5000円</p>';
  document.body.appendChild(htmlBox);
  const updateHtmlPosition = () => {
    const vector = new THREE.Vector3();
    box.getWorldPosition(vector);
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (1 - (vector.y * 0.5 + 0.5)) * window.innerHeight;

    htmlBox.style.left = `${x - 50}px`; // Center the HTML element horizontally
    htmlBox.style.top = `${y - 100}px`; // Center the HTML element vertically
  };

  // Update the position of the HTML box on each frame
  const animate = () => {
    requestAnimationFrame(animate);
    updateHtmlPosition();
  };
  animate();

  // Close button functionality
  const onClick = (event: MouseEvent) => {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(closeButton);

    if (intersects.length > 0) {
      gsap.to(clickedBubble.position, {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z - 200,
        duration: 2,
        ease: "power4.inOut",
      });
      gsap.timeline()
        .to(box.material, { opacity: 0, duration: 1, ease: "power2.in" })
        .to(group.scale, {
          x: 0,
          duration: 0.7,
          ease: "power2.in",
          onComplete: () => {
            scene.remove(group);
            if (document.body.contains(htmlBox)) {
              document.body.removeChild(htmlBox); // Remove HTML element
            }
          },
        }, "<");

      // Fade out HTML box
      gsap.to(htmlBox.style, {
        opacity: 0, // Fade out
        duration: 0.5, // Same duration as the 3D box fade out
        ease: "power2.in",
        onComplete: () => {
          // Check if htmlBox is still a child of document.body before attempting to remove it
          if (document.body.contains(htmlBox)) {
            document.body.removeChild(htmlBox); // Remove HTML element after fade out
          }
          animstate = "idle";
        },
      });
    }
  };

  window.addEventListener('click', onClick);

  return () => {
    window.removeEventListener('click', onClick);
    document.body.removeChild(htmlBox); // Cleanup HTML element when removing the event listener
  };
};




export default DeepSeaScene;
