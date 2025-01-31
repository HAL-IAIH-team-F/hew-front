import {MutableRefObject, useEffect, useMemo, useRef} from "react";
import * as THREE from "three";
import {Mesh, Scene, WebGLRenderer} from "three";
import {EffectComposer} from "three-stdlib";
import Effects from "@/(main)/(timeline)/effects/camera/Effects";
import useProducts from "~/hooks/useProducts";
import {createGradientBackground} from "@/(main)/(timeline)/background/background";
import {generateGomi} from "@/(main)/(timeline)/effects/gomi/gomi";
import {createBubbles, onClickBubble} from "@/(main)/(timeline)/bubble/bubbles";
import {Manager} from "~/manager/manager";
import {useThree} from "@react-three/fiber";
import {LoadedClientState} from "~/api/context/ClientState";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useSidebarManagerState} from "@/(main)/(timeline)/_window/_sidebar/SidebarManaager";

export default function TimelineAnimation(
  {}: {},
) {
  const {camera, gl} = useThree();
  if (!(camera instanceof THREE.PerspectiveCamera)) throw new Error("camera is not PerspectiveCamera")
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const bubblesRef = useRef<THREE.Mesh[]>([]);
  const glowingGomiRef = useRef<THREE.Mesh[]>([]);
  const mousePosition = useRef({x: 0, y: 0});
  const targetCameraRotation = useRef({x: 0, y: 0});
  const rotationStrength = 0.05;
  const scene = useMemo(() => new THREE.Scene(), []);
  const effectsRef = useRef<Effects | null>(null);
  const {products, error} = useProducts();
  if (error) console.error(error)
  const managerState = useSidebarManagerState()
  const clientState = useClientState()

  useEffect(() => {
    if (sceneRef.current) return
    if (managerState.state != "loaded") return;
    if (clientState.state == "loading") return;

    createGradientBackground(scene, managerState.manager.value.sessionId);
    sceneRef.current = scene;

    camera.position.z = 500;

    gl.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = gl;

    const effects = new Effects(gl, scene, camera);
    effectsRef.current = effects;

    const {composer} = effects;
    composerRef.current = composer;

    generateGomi(scene, glowingGomiRef.current, 300, managerState.manager.value.riseSpeed, managerState.manager);
    console.log(products)
    createBubbles(
      scene, managerState.manager.value.bbnum, managerState.manager.value.sessionId, [], camera, clientState,
    ).then((newBubbles) => {
      bubblesRef.current = newBubbles
      if (managerState.manager.value.sessionId == 1) {
        effects.startAnimesion(bubblesRef.current, managerState.manager)
      }

      animateHighFPS(0, managerState.manager, camera, targetCameraRotation, rotationStrength, composerRef, sceneRef);
    });
  }, [managerState.state, clientState.state]);

  useEffect(() => {
    if (managerState.state != "loaded") return;
    if (clientState.state == "loading") return;

    const handleMouseMove = (event: MouseEvent) =>
      onMouseMove(mousePosition, event, targetCameraRotation);

    const handleClick = (event: MouseEvent) =>
      onClick(sceneRef, camera, bubblesRef, managerState.manager, rendererRef, effectsRef, event, clientState);
    const handleResize = () => onResize(camera, rendererRef, composerRef)

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', () => handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [managerState.state, clientState.state]);

  return (
    <>
    </>
  )
}

function animateHighFPS(
  time: number,
  manager: Manager,
  camera: THREE.Camera,
  targetCameraRotation: MutableRefObject<{ x: number; y: number }>,
  rotationStrength: number,
  composerRef: MutableRefObject<EffectComposer | null>,
  sceneRef: MutableRefObject<Scene | null>
) {
  requestAnimationFrame(time1 => animateHighFPS(time1, manager, camera, targetCameraRotation, rotationStrength, composerRef, sceneRef));
  const currentTime = time / 1000;
  const deltaTime = currentTime - manager.value.lastFrameTimeHigh;

  if (deltaTime >= 1 / manager.value.fpshigh) {
    manager.value.lastFrameTimeHigh = currentTime;
    // cameraRef.current.position.x += (targetCameraPosition.current.x - cameraRef.current.position.x) * parallaxStrength;
    // // cameraRef.current.position.y += (targetCameraPosition.current.y - cameraRef.current.position.y) * parallaxStrength;
    camera.rotation.x += (targetCameraRotation.current.y - camera.rotation.x) * rotationStrength;
    camera.rotation.y += (targetCameraRotation.current.x - camera.rotation.y) * rotationStrength;
    if (composerRef.current && sceneRef.current) {
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
  camera: THREE.PerspectiveCamera,
  bubblesRef: MutableRefObject<Mesh[]>,
  manager: Manager,
  rendererRef: MutableRefObject<WebGLRenderer | null>,
  effectsRef: MutableRefObject<Effects | null>,
  event: MouseEvent,
  clientState: LoadedClientState,
) {
  if (sceneRef.current && bubblesRef.current && manager.value.animstate === "idle" && rendererRef.current && effectsRef.current) {
    onClickBubble(manager, event, bubblesRef.current, camera, sceneRef.current, effectsRef.current, clientState);
  }
}

function onResize(
  camera: THREE.PerspectiveCamera,
  rendererRef: MutableRefObject<WebGLRenderer | null>,
  composerRef: MutableRefObject<EffectComposer | null>
) {
  if (rendererRef.current) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }
  if (composerRef.current) {
    composerRef.current.setSize(window.innerWidth, window.innerHeight);
  }
}
