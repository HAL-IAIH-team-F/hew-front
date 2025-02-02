import useProductId from "~/products/useProductId";
import {useEffect, useMemo} from "react";
import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import gsap from "gsap";
import {useWindowSize} from "@/_hook/useWindowSize";
import {MOBILE_WIDTH} from "~/products/ContextProvider";

export default function CameraPosition(
    {}: {},
) {
    const {camera} = useThree()
    if (!(camera instanceof THREE.PerspectiveCamera)) throw new Error("camera is not PerspectiveCamera")
    const productId = useProductId()
    const windowSize = useWindowSize()
    const targetPositionX = useMemo(() => {
        if (productId == undefined || windowSize.width < MOBILE_WIDTH) return -10
        else return 50
    }, [productId, windowSize]);
    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
            }
        });
        tl.to(camera.position, {
            x: targetPositionX,
            duration: 0.3,
            ease: 'power2.out',
        })
    }, [targetPositionX]);
    return undefined
}
