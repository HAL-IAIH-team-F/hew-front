// DescriptionButton.tsx
import React, {useState} from 'react';
import {
    createRequestCloseDescriptionAnimationState,
    createRequestOpenDescriptionAnimationState,
    useDescriptionSwitchAnimationState
} from "@/(main)/lp/DescriptionSwitchAnimation";


export function DescriptionButton(
    {}: {}
) {
    const [isClicked, setIsClicked] = useState(false);
    const [buttonText, setButtonText] = useState("Description of this site");
    const [buttonPosition, setButtonPosition] = useState("bottom");
    const descriptionState = useDescriptionSwitchAnimationState()

    const handleClick = () => {
        if (descriptionState.state == "loading") return
        console.log("click", buttonText)
        if (buttonText === "Description of this site") {
            setIsClicked(true);
            setTimeout(() => {
                setButtonText("Return Title");
                setButtonPosition("top");
                setIsClicked(false);
            }, 3000);
            descriptionState.set(createRequestOpenDescriptionAnimationState(descriptionState.set))
        } else {
            setIsClicked(true);
            setTimeout(() => {
                setButtonText("Description of this site");
                setButtonPosition("bottom");
                setIsClicked(false);
            }, 3000);
            descriptionState.set(createRequestCloseDescriptionAnimationState(descriptionState.set))
        }
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: "fixed",
                textAlign: "center",
                bottom: buttonPosition === "bottom" ? "6px" : "auto",
                top: buttonPosition === "top" ? "6px" : "auto",
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
                opacity: isClicked ? 0 : 1,
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
            {buttonText}
        </button>
    );
}
