"use client"
import React, {useEffect, useState} from "react";
import {
  createRequestCloseDescriptionAnimationState,
  useDescriptionSwitchAnimationState
} from "@/(main)/lp/DescriptionSwitchState";

export default function CloseDescriptionButton() {
  const [isTransparent, setIsTransparent] = useState(true);
  const descriptionState = useDescriptionSwitchAnimationState();

  const handleClick = () => {
    if (descriptionState.state === "loading") return;
    setIsTransparent(true);
    setTimeout(() => {
      setIsTransparent(false);
    }, 3000);
    descriptionState.set(createRequestCloseDescriptionAnimationState(descriptionState.set));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTransparent(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
      <>
        <button
            onClick={handleClick}
            style={{
              position: "fixed",
              textAlign: "center",
              top: "6px",
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
          Return Title
        </button>

        {/* YouTube埋め込みプレビュー */}
        <div
            style={{
              position: "fixed",
              textAlign: "center",
              top: "45%",
              left: "50%",
              zIndex: 10,
              transform: "translateX(-50%) translateY(-50%)",
              opacity: isTransparent ? 0 : 1,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              cursor: 'pointer',
            }}
            className={"max-w-full w-[1280px] p-1"}
        >
          <iframe
              className={"w-full aspect-video"}
              src="https://www.youtube.com/embed/TVWrXHQTP94"
              title="画像販売CtoCサービス「DiVER」紹介動画"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
          />
        </div>
      </>
  );
}
