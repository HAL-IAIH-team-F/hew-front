// UIContainer.tsx
'use client';
import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import Title from '../../../../_top/Title';
import LoginButton from '../../../../_top/LoginButton';
import RegisterButton from '../../../../_top/RegisterButton';

import {FaCheckCircle} from 'react-icons/fa';
import {useClientState} from "~/api/context/ClientContextProvider"; // React Icons のチェックマーク
import {useWindowSize} from '@/_hook/useWindowSize';
import {MOBILE_WIDTH} from '~/products/ContextProvider';
import LpTopContainer from "@/(main)/lp/(top)/_top/LpTopContainer";


function LpTopUi(
    {}: {}
) {
    const [isloading, setIsloading] = useState(false);
    const windowSize = useWindowSize();
    const isMobile = windowSize.width < MOBILE_WIDTH;
    const clientContext = useClientState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkMarkRef = useRef<HTMLDivElement>(null); // チェックマークの参照
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
        if (isAuthenticated && checkMarkRef.current) {
            gsap.fromTo(
                checkMarkRef.current,
                {scale: 0, opacity: 0},
                {scale: 1, opacity: 1, duration: 1, ease: "expo.out"}
            );
        }
    }, [isAuthenticated]);

    return (
        <>
            <LpTopContainer>
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
                            </>
                        )}
                    </div>
                </div>
            </LpTopContainer>
        </>
    );
}

export default LpTopUi;
