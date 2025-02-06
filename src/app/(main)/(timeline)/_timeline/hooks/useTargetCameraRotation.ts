import {useRef} from "react";
import useWindowEvent from "../../../../../util/hook/useWindowEvent";

export default function useTargetCameraRotation() {
    const targetCameraRotation = useRef({x: 0, y: 0});
    useWindowEvent("mousemove", event => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;

        targetCameraRotation.current.x = -x * 0.07;
        targetCameraRotation.current.y = -y * 0.07;
    }, [])
    return targetCameraRotation;
}