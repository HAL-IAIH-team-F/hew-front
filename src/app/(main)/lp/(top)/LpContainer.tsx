import {ReactNode, useEffect, useRef} from "react";
import {useDescriptionSwitchAnimationState} from "@/(main)/lp/DescriptionSwitchState";
import gsap from "gsap";

export default function LpContainer(
    {
        children,
        isShow, onComplete,
    }: {
        children?: ReactNode,
        isShow: boolean,
        onComplete?: () => void,
    },
) {
    const UIContainerRef = useRef<HTMLDivElement>(null);
    const descriptionState = useDescriptionSwitchAnimationState()
    useEffect(() => {
        if (isShow) return
        gsap.to(UIContainerRef.current, {
            y: -40,
            opacity: 0,
            duration: 2.4,
            ease: "expo.inOut",
            onComplete: onComplete
        });
    }, [isShow]);
    useEffect(() => {
        if (!isShow) return

        gsap.to(UIContainerRef.current, {
            y: 0,
            duration: descriptionState.prevState == "opened" ? 2 : 0.5,
            ease: "expo.inOut",
            onComplete: () => {
                gsap.to(UIContainerRef.current, {
                    opacity: 1,
                    duration: 1,
                    ease: "expo.inOut",
                });
            }
        });
    }, [isShow]);


    return (
        <div ref={UIContainerRef} className="UI" style={{
            position: 'fixed',
            top: '-40px',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'UDEVGothic, sans-serif',
            zIndex: 6,
            opacity: 0,
        }}>
            {children}
        </div>
    )
}
