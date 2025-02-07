"use client"
import React, {useEffect, useState} from "react";
import {
    createRequestOpenDescriptionAnimationState,
    useDescriptionSwitchAnimationState
} from "@/(main)/lp/DescriptionSwitchAnimation";

export default function OpenDescriptionButton(
    {}: {},
) {

    const [isTransparent, setIsTransparent] = useState(true);
    const descriptionState = useDescriptionSwitchAnimationState()

    const handleClick = () => {
        if (descriptionState.state == "loading") return
        setIsTransparent(true);
        setTimeout(() => {
            setIsTransparent(false);
        }, 3000);
        descriptionState.set(createRequestOpenDescriptionAnimationState(descriptionState.set))
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsTransparent(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <button
            onClick={handleClick}
            style={{
                position: "fixed",
                textAlign: "center",
                bottom: "6px",
                left: "50%",
                zIndex: 10,
                transform: "translateX(-50%)",
                fontFamily: 'UDEVGothic, sans-serif',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 'bold',
                fontSize: "0.8em",
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                opacity: isTransparent ? 0 : 1,
                transition: 'opacity 0.3s ease, color 0.3s ease, transform 0.3s ease, top 0.3s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            }}
        >
      <span
          style={{
              position: 'absolute',
              top: '-20px',
              bottom: '-20px',
              left: '-40px',
              right: '-40px',
              content: '""',
          }}
      />
            Description of this site
        </button>
    );
}
