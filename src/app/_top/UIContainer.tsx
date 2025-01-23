// UIContainer.tsx
'use client';
import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import Title from './Title';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import {useClientState} from '~/api/context/ClientContextProvider';

type UIContainerProps = {
  onButtonClick: boolean;
};

const UIContainer: React.FC<UIContainerProps> = ({onButtonClick}) => {
  const [isMobile, setIsMobile] = useState(false);
  const UIContainerRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);
  const clientContext = useClientState();
  const [isAuthenticated, setIsloading] = useState(false); // 認証状態を管理

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    if (clientContext.state !== "loading") return
    setIsloading(true);
  }, [clientContext.state]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      setTimeout(() => {
        isInitialRender.current = false;
      }, 0);
      return;
    }

    if (UIContainerRef.current) {
      if (onButtonClick) {
        gsap.to(UIContainerRef.current, {
          y: -40,
          opacity: 0,
          duration: 2.4,
          ease: "expo.inOut",
        });

      } else {
        gsap.to(UIContainerRef.current, {
          y: 0,
          duration: 2,
          ease: "expo.inOut",
          onComplete: () => {
            gsap.to(UIContainerRef.current, {
              opacity: 1,
              duration: 1,
              ease: "expo.inOut",
            });
          }
        });
      }
    }
  }, [onButtonClick]);

  return (
    <div ref={UIContainerRef} className="UI" style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'rgba(255, 255, 255, 0.9)',
      fontFamily: 'UDEVGothic, sans-serif',
      zIndex: 6
    }}>
      <div style={{
        textAlign: 'center',
        padding: isMobile ? '20px 30px' : '30px 50px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: isMobile ? '90%' : 'auto',
      }}>
        <Title/>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}
        >
          {isAuthenticated ? (
            <div className="loading-spinner" style={{
              width: '30px',
              height: '30px',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderTop: '4px solid #ffffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}/>
          ) : (
            <>
              <LoginButton/>
              <RegisterButton/>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UIContainer;
