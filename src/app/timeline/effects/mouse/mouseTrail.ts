"use client";
import React, { useEffect, useRef } from "react";
import "./trail.css";

export const MouseTrail = () => {
    const trailRef = useRef<HTMLDivElement[]>([]);
    const rippleRef = useRef<HTMLDivElement[]>([]);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = ""; // クリーンアップ時に元に戻す
        };
      }, []);
      
    useEffect(() => {
        const TRAIL_SIZE = 15; // Adjust according to the CSS width and height
        const RIPPLE_SIZE = 20; // Adjust according to the CSS width and height
        
        const handleMouseMove = (event: MouseEvent) => {
            const trailElement = document.createElement("div");
            trailElement.className = "trail";

            // Calculate position to keep the element within the viewport
            const x = Math.min(
                Math.max(event.pageX, TRAIL_SIZE / 2),
                window.innerWidth - TRAIL_SIZE / 2
            );
            const y = Math.min(
                Math.max(event.pageY, TRAIL_SIZE / 2),
                window.innerHeight - TRAIL_SIZE / 2
            );

            trailElement.style.left = `${x}px`;
            trailElement.style.top = `${y}px`;
            document.body.appendChild(trailElement);
            trailRef.current.push(trailElement);

            if (trailRef.current.length > 20) {
                const oldTrail = trailRef.current.shift();
                oldTrail?.remove();
            }
        };

        const handleClick = (event: MouseEvent) => {
            const rippleElement = document.createElement("div");
            rippleElement.className = "click-ripple";

            const x = Math.min(
                Math.max(event.pageX, RIPPLE_SIZE / 2),
                window.innerWidth - RIPPLE_SIZE / 2
            );
            const y = Math.min(
                Math.max(event.pageY, RIPPLE_SIZE / 2),
                window.innerHeight - RIPPLE_SIZE / 2
            );

            rippleElement.style.left = `${x}px`;
            rippleElement.style.top = `${y}px`;
            document.body.appendChild(rippleElement);
            rippleRef.current.push(rippleElement);

            rippleElement.addEventListener("animationend", () => {
                rippleElement.remove();
                rippleRef.current = rippleRef.current.filter((r) => r !== rippleElement);
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            trailRef.current.forEach((trail) => trail.remove());
            rippleRef.current.forEach((ripple) => ripple.remove());
        };
    }, []);

    return null;
};
