// UIContainer.tsx
'use client';
import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import Title from './Title';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';

import {FaCheckCircle} from 'react-icons/fa';
import {useClientState} from "~/api/context/ClientContextProvider"; // React Icons のチェックマーク
import {useWindowSize} from '@/_hook/useWindowSize';
import {MOBILE_WIDTH} from '~/products/ContextProvider';

type UIContainerProps = {
    onButtonClick: boolean;
};

const UIContainer: React.FC<UIContainerProps> = ({onButtonClick}) => {
    const UIContainerRef = useRef<HTMLDivElement>(null);
    const isInitialRender = useRef(true);
    const clientContext = useClientState();
    const [isloading, setIsloading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkMarkRef = useRef<HTMLDivElement>(null); // チェックマークの参照
    const windowSize = useWindowSize();
    const isMobile = windowSize.width < MOBILE_WIDTH;

    useEffect(() => {
        if (clientContext.state === "registered") {
            setIsloading(false);
            setIsAuthenticated(true);
        }
        if (clientContext.state !== "loading") {
            setIsloading(false);
        } else {
            setIsloading(true);
        }
    }, [clientContext.state]);

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

    useEffect(() => {
        if (isAuthenticated && checkMarkRef.current) {
            gsap.fromTo(
                checkMarkRef.current,
                {scale: 0, opacity: 0},
                {scale: 1, opacity: 1, duration: 1, ease: "expo.out"}
            );
        }
    }, [isAuthenticated]);

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
            zIndex: 6,
        }}>
            <div style={{
                textAlign: 'center',
                padding: isMobile ? '20px 30px' : '30px 50px',
                borderRadius: '8px',
                boxSizing: "border-box", // サイズ計算にパディングを含む
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: isMobile ? '90%' : '30%',
            }} className={"min-w-fit h-fit"}>
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
                    {isloading ? (
                        <div className="loading-spinner" style={{
                            width: '30px',
                            height: '30px',
                            border: '4px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '4px solid #ffffff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}/>
                    ) : isAuthenticated ? (
                        <div
                            ref={checkMarkRef}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                opacity: 0, // 初期状態で非表示
                            }}
                        >
                            <FaCheckCircle
                                style={{
                                    color: '#4caf50',
                                    fontSize: '30px',
                                }}
                            />
                        </div>
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
