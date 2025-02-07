"use client";

import {FC, useEffect, useRef, useState} from "react";
import gsap from "gsap";
import ProfileProductsView from "~/products/ProfileProductsView";
import {useUserData} from "~/api/context/useUserData";
import Backcanvas from "@/(main)/(timeline)/account/profile/backcanvas";

interface AccountCardProps {
}

const AccountCard: FC<AccountCardProps> = ({}) => {
    const {user} = useUserData();
    const [activeTab, setActiveTab] = useState<string>("商品");
    const contentRef = useRef<HTMLDivElement | null>(null);

    // **tabs を先に宣言**
    const tabs = ["商品", "コラボ", "Media", "Likes"];

    // **tabRefs を後で初期化**
    const tabRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>(
        Object.fromEntries(tabs.map((tab) => [tab, useRef<HTMLDivElement>(null)]))
    );

    // タブ変更時のコンテンツアニメーション
    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                {opacity: 0, y: 10},
                {opacity: 1, y: 0, duration: 0.3, ease: "power2.out"}
            );
        }
    }, [activeTab]);

    // タブ変更時のボタン背景色アニメーション
    useEffect(() => {
        if (tabRefs.current[activeTab]?.current) {
            gsap.to(tabRefs.current[activeTab].current, {
                backgroundColor: "rgba(255, 255, 255, 0.2)", // 透明感のある白
                backdropFilter: "blur(10px)", // 背景ぼかし
                duration: 0.3,
                ease: "power2.out",
            });
        }

        return () => {
            tabs.forEach((tab) => {
                if (tabRefs.current[tab]?.current && tab !== activeTab) {
                    gsap.to(tabRefs.current[tab].current, {
                        backgroundColor: "transparent",
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            });
        };
    }, [activeTab]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "20px",
                fontFamily: "'Roboto', 'Arial', sans-serif",
                color: "#fff",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "optimizeLegibility",
                
            }}
            className={"w-full h-full"}
        >
            {/* Header */}
            <div
                style={{
                    fontWeight: "bold",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                }}
                className={"w-full h-full"}
            >
                <Backcanvas user={user}/>

                {/*  /!* Tabs *!/*/}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                        margin: "23px 0",
                        width: "100%",
                        padding: "10px 0",
                    }}
                >
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            ref={tabRefs.current[tab]}
                            onClick={() => {
                                if (tab !== activeTab) {
                                    setActiveTab(tab);
                                }
                            }}
                            style={{
                                padding: "12px 25px",
                                cursor: "pointer",
                                fontWeight: activeTab === tab ? "bold" : "normal",
                                color: "#fff",
                                borderRadius: "12px",
                                transition: "all 0.3s ease",
                                position: "relative",
                                backgroundColor: activeTab === tab ? "rgba(255, 255, 255, 0.2)" : "transparent",
                                backdropFilter: activeTab === tab ? "blur(10px)" : "none",
                            }}
                        >
                            {tab}
                            {/* アクティブタブの下線 */}
                            {activeTab === tab && (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "-5px",
                                        left: "50%",
                                        width: "50%",
                                        height: "3px",
                                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                                        borderRadius: "2px",
                                        transform: "translateX(-50%)",
                                        transition: "width 0.3s ease",
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <div
                    ref={contentRef}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "15px",
                        flex: 1,
                        width: "calc(100% - 15px)",
                        maxHeight: "calc(100vh)",
                        overflowY: "auto",
                    }}
                >
                    {activeTab === "商品" && <ProfileProductsView/>}
                    {activeTab === "コラボ" && <div>コラボ</div>}
                    {activeTab === "Media" && <div>Displaying media...</div>}
                    {activeTab === "Likes" && <div>Displaying likes...</div>}
                </div>
            </div>
        </div>
    );
};

export default AccountCard;
