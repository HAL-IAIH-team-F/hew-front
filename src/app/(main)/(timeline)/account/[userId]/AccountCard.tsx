"use client"
import React, {useEffect, useRef, useState} from "react";
import {useUserData} from "~/api/context/useUserData";
import CollaborationButton from "@/(main)/(timeline)/account/[userId]/_profile/AccountCard/CollaborationButton";
import {ProductsGrid} from "@/(main)/(timeline)/account/[userId]/_profile/AccountCard/ProductGrid";
import {IconCard} from "~/Icon/IconCard";
import {FullScreenLoader} from "~/loadingUI/FullSceenLoader";


export function AccountCard(
    {
      userId
    }: {
      userId: string
    }
) {
  const [activeTab, setActiveTab] = useState("商品");
  const tabs = ["商品", "コラボ",];
  const tabRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>(
      Object.fromEntries(tabs.map((tab) => [tab, React.createRef<HTMLButtonElement>()]))
  );
  const user = useUserData(userId);
  const contentRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.style.opacity = "0";
    contentRef.current.style.transform = "translateY(10px)";

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (!contentRef.current) return;
        contentRef.current.style.opacity = "1";
        contentRef.current.style.transform = "translateY(0)";
      }, 50);
    });
  }, [activeTab]);

  return (
      <div>
        {user ? (
            <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
              {/* ヘッダー */}
              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  top: "10%",
                  left: "50px",
                  margin: "30px",
                  transform: "scale(1.3)" // 拡大
                }}>
                  <IconCard userData={user}/>
                </div>
              </div>
              <CollaborationButton userInfo={user}/>

              {/* タブ */}
              <div className="border-b border-gray-700">
                <div className="flex justify-center space-x-5 px-4 pb-3">
                  {tabs.map((tab) => (
                      <button
                          key={tab}
                          ref={tabRefs.current[tab]}
                          onClick={() => setActiveTab(tab)}
                          className={`
                              px-6 py-3 text-sm rounded-lg transition-all duration-200
                              ${activeTab === tab
                              ? "bg-gray-700 text-gray-100 font-medium"
                              : "text-gray-400 hover:text-gray-100 hover:bg-gray-700/50"}
                          `}
                      >
                        {tab}
                      </button>
                  ))}
                </div>
              </div>
              {/* コンテンツ */}
              <div
                  ref={contentRef}
                  className="flex-1 flex-grow overflow-y-auto transition-all duration-300 ease-out"
                  style={{
                    height: "calc(100vh - 200px)",
                    maxHeight: "calc(100vh - 360px)",
                    boxSizing: "border-box",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
              >
                {activeTab === "商品" ? (
                    user ? <ProductsGrid userdata={user}/> :
                        <div className="p-6 text-center text-gray-400">商品がありません</div>
                ) : (
                    <div className="p-6">コラボ content...</div>
                )}
              </div>
            </div>
        ) : (
            <FullScreenLoader/>
        )}
      </div>
  );
}