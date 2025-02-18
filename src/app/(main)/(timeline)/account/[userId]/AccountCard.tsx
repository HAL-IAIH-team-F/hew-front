"use client"
import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState} from "react";
import {useUserData} from "~/api/context/useUserData";
import Image from "../../../../../util/Image";
import CollaborationButton from "@/(main)/(timeline)/account/[userId]/_profile/AccountCard/CollaborationButton";
import {ProductsGrid} from "@/(main)/(timeline)/account/[userId]/_profile/AccountCard/ProductGrid";


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
  const {user} = useUserData(userId);
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
      <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
        {/* ヘッダー */}
        <div
            className="w-full h-48 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
          {user && user.icon ? (
              <div className="flex flex-col items-center">
                <div className="rounded-full">
                  <Image
                      alt="User Icon"
                      src={user.icon.strUrl()}
                      className="w-24 h-24 rounded-full object-contain border-4 border-gray-700"
                  />
                </div>
                <div className="mt-3 text-lg font-semibold">{user.name}</div>
                <div className="text-sm text-gray-400">@{user.id}</div>
              </div>
          ) : (
              <div className="flex flex-col items-center">
                <Image
                    alt="Default Icon"
                    src="/icon.png"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
                />
                <div className="mt-3 text-lg font-semibold">ログインしていません</div>
                <div className="text-sm text-gray-400">error</div>
              </div>
          )}

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
  );
}