import {MutableRefObject, useEffect, useMemo, useRef} from "react";
import * as THREE from "three";
import {Scene} from "three";
import {EffectComposer} from "three-stdlib";
import Effects from "@/(main)/(timeline)/effects/camera/Effects";
import useProducts from "~/hooks/useProducts";
import {createGradientBackground} from "@/(main)/(timeline)/background/background";
import {generateGomi} from "@/(main)/(timeline)/effects/gomi/gomi";
import {createBubbles} from "@/(main)/(timeline)/_timeline/bubble/bubbles";
import {Manager} from "~/manager/manager";
import {useThree} from "@react-three/fiber";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useSidebarManagerState} from "@/(main)/(timeline)/_window/_sidebar/SidebarManaager";
import useTargetCameraRotation from "@/(main)/(timeline)/_timeline/hooks/useTargetCameraRotation";
import {BubbleMesh} from "@/(main)/(timeline)/_timeline/bubble/BubbleMesh";

export default function TimelineAnimation(
    {
        sceneRef, bubblesRef, effectsRef,
    }: {
        sceneRef: MutableRefObject<Scene | null>,
        bubblesRef: MutableRefObject<BubbleMesh[]>,
        effectsRef: MutableRefObject<Effects | null>,
    },
) {
    const targetCameraRotation = useTargetCameraRotation()
    const {camera, gl} = useThree();
    if (!(camera instanceof THREE.PerspectiveCamera)) throw new Error("camera is not PerspectiveCamera")
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const composerRef = useRef<EffectComposer | null>(null);
    const glowingGomiRef = useRef<THREE.Mesh[]>([]);
    // const mousePosition = useRef({x: 0, y: 0});
    const rotationStrength = 0.05;
    const scene = useMemo(() => new THREE.Scene(), []);
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

    return undefined
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
