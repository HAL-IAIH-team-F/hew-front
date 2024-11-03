// DescriptionButton.tsx
import React, { useState } from 'react';

type DescriptionButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const DescriptionButton: React.FC<DescriptionButtonProps> = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState("Description of this site");
  const [buttonPosition, setButtonPosition] = useState("bottom");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonText === "Description of this site") {
      setIsClicked(true);
      setTimeout(() => {
        setButtonText("Return Title");
        setButtonPosition("top");
        setIsClicked(false);
      }, 3000);
      onClick(e);
    } else {
      setIsClicked(true);
      setTimeout(() => {
        setButtonText("Description of this site");
        setButtonPosition("bottom");
        setIsClicked(false);
      }, 3000);
      onClick(e);
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
        fontSize: "0.7em",
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        opacity: isClicked ? 0 : 1,
        transition: 'opacity 0.3s ease, color 0.3s ease, transform 0.3s ease, top 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
        e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
        e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
      }}
    >
      {buttonText}
    </button>
  );
};
