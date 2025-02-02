import {MutableRefObject, useEffect} from "react";
import {useSidebarManagerState} from "@/(main)/(timeline)/_window/_sidebar/SidebarManaager";
import {useClientState} from "~/api/context/ClientContextProvider";
import * as THREE from "three";
import {Scene} from "three";
import Effects from "@/(main)/(timeline)/effects/camera/Effects";
import {onClickBubble} from "@/(main)/(timeline)/_timeline/bubble/bubbles";
import {useThree} from "@react-three/fiber";
import useRoutes from "~/route/useRoutes";
import {BubbleMesh} from "@/(main)/(timeline)/_timeline/bubble/BubbleMesh";

export default function BaubleClickHandler(
    {
        sceneRef, bubblesRef, effectsRef,
    }: {
        sceneRef: MutableRefObject<Scene | null>,
        bubblesRef: MutableRefObject<BubbleMesh[]>,
        effectsRef: MutableRefObject<Effects | null>,
    },
) {
    const managerState = useSidebarManagerState()
    const clientState = useClientState()
    const {camera} = useThree();
    if (!(camera instanceof THREE.PerspectiveCamera)) throw new Error("camera is not PerspectiveCamera")
    const routes = useRoutes()

    useEffect(() => {
        if (managerState.state != "loaded") return;
        if (clientState.state == "loading") return;

        const handleClick = (event: MouseEvent) => {
            if (managerState.manager.value.animstate !== "idle") return;
            if (bubblesRef.current == undefined) return;
            if (effectsRef.current == undefined) return;
            if (sceneRef.current == undefined) return;
            onClickBubble(
                managerState.manager, event, bubblesRef.current, camera, sceneRef.current, effectsRef.current,
                clientState, routes,
            );
        }

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [managerState.state, clientState]);


    return undefined
}
