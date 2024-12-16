import {MutableRefObject, RefObject, useEffect, useMemo, useRef} from "react";
import {createGradientBackground} from "@/timeline/background/background";
import * as THREE from "three";
import {Mesh, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import Effects from "@/timeline/effects/camera/Effects";
import {generateGomi} from "@/timeline/effects/gomi/gomi";
import {createBubbles, onClickBubble} from "@/timeline/bubble/bubbles";
import {Manager} from "~/manager/manager";
import {EffectComposer} from "three-stdlib";

export default function useTimelineAnimation(
  manager: Manager,
  mountRef: RefObject<HTMLDivElement | null>
) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const bubblesRef = useRef<THREE.Mesh[]>([]);
  const glowingGomiRef = useRef<THREE.Mesh[]>([]);
  const mousePosition = useRef({x: 0, y: 0});
  const targetCameraRotation = useRef({x: 0, y: 0});
  const rotationStrength = 0.05;
  const scene = useMemo(() => new THREE.Scene(), []);
  const effectsRef = useRef<Effects | null>(null);

  useEffect(() => {
    if (sceneRef.current) return
    if (!mountRef.current) return;

    createGradientBackground(scene, manager.value.sessionId);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 500;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    const effects = new Effects(renderer, scene, camera);
    effectsRef.current = effects;

    const {composer} = effects;
    composerRef.current = composer;

    generateGomi(scene, glowingGomiRef.current, 300, manager.value.riseSpeed, manager);
    bubblesRef.current = createBubbles(scene, manager.value.bbnum, manager.value.sessionId, [], camera);

    if (manager.value.sessionId == 1) {
      effects.startAnimesion(bubblesRef.current, manager)
    }

    animateHighFPS(0, manager, cameraRef, targetCameraRotation, rotationStrength, composerRef, sceneRef);

  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) =>
      onMouseMove(mousePosition, event, targetCameraRotation);

    const handleClick = (event: MouseEvent) =>
      onClick(sceneRef, cameraRef, bubblesRef, manager, rendererRef, effectsRef, event);
    const handleResize = () => onResize(cameraRef, rendererRef, composerRef)

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', () => handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

}

function animateHighFPS(
  time: number,
  manager: Manager,
  cameraRef: MutableRefObject<PerspectiveCamera | null>,
  targetCameraRotation: MutableRefObject<{ x: number; y: number }>,
  rotationStrength: number,
  composerRef: MutableRefObject<EffectComposer | null>,
  sceneRef: MutableRefObject<Scene | null>
) {
  requestAnimationFrame(time1 => animateHighFPS(time1, manager, cameraRef, targetCameraRotation, rotationStrength, composerRef, sceneRef));
  const currentTime = time / 1000;
  const deltaTime = currentTime - manager.value.lastFrameTimeHigh;

  if (deltaTime >= 1 / manager.value.fpshigh) {
    manager.value.lastFrameTimeHigh = currentTime;
    if (cameraRef.current) {
      // cameraRef.current.position.x += (targetCameraPosition.current.x - cameraRef.current.position.x) * parallaxStrength;
      // // cameraRef.current.position.y += (targetCameraPosition.current.y - cameraRef.current.position.y) * parallaxStrength;
      cameraRef.current.rotation.x += (targetCameraRotation.current.y - cameraRef.current.rotation.x) * rotationStrength;
      cameraRef.current.rotation.y += (targetCameraRotation.current.x - cameraRef.current.rotation.y) * rotationStrength;
    }
    if (composerRef.current && sceneRef.current && cameraRef.current) {
      composerRef.current.render();
    }
  }
}

function onMouseMove(
  mousePosition: MutableRefObject<{ x: number, y: number }>,
  event: MouseEvent,
  targetCameraRotation: MutableRefObject<{ x: number; y: number }>
) {
  mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.current.y = (event.clientY / window.innerHeight) * 2 - 1;

  targetCameraRotation.current.x = -mousePosition.current.x * 0.07;
  targetCameraRotation.current.y = -mousePosition.current.y * 0.07;
}

function onClick(
  sceneRef: MutableRefObject<Scene | null>,
  cameraRef: MutableRefObject<PerspectiveCamera | null>,
  bubblesRef: MutableRefObject<Mesh[]>,
  manager: Manager,
  rendererRef: MutableRefObject<WebGLRenderer | null>,
  effectsRef: MutableRefObject<Effects | null>,
  event: MouseEvent
) {
  if (sceneRef.current && cameraRef.current && bubblesRef.current && manager.value.animstate === "idle" && rendererRef.current && effectsRef.current) {
    onClickBubble(manager, event, bubblesRef.current, cameraRef.current, sceneRef.current, effectsRef.current);
  }
}

function onResize(
  cameraRef: MutableRefObject<PerspectiveCamera | null>,
  rendererRef: MutableRefObject<WebGLRenderer | null>,
  composerRef: MutableRefObject<EffectComposer | null>
) {
  if (cameraRef.current && rendererRef.current) {
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }
  if (composerRef.current) {
    composerRef.current.setSize(window.innerWidth, window.innerHeight);
  }
}
