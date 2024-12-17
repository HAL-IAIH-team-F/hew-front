"use client";

import { useState } from "react";
import { Manager } from "~/manager/manager";
import ProfileProductsView from "~/products/ProfileProductsView";
import {useUserData} from "~/api/context/useUserData";
import Backcanvas from "@/(main)/user/profile/backcanvas";
interface AccountCardProps {
  manager: Manager; // Manager 型を明確に定義
}
const AccountCard: React.FC<AccountCardProps> = ({ manager }) => {

  const { user } = useUserData();
  const [activeTab, setActiveTab] = useState<string>("商品");

  const tabs = ["商品", "コラボ", "Media", "Likes"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        fontSize: "20px",
        fontFamily: "'Roboto', 'Arial', sans-serif",
        color: "#fff",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased", // フォントスムージングの有効化
        MozOsxFontSmoothing: "grayscale", // Mac用のスムージング
        textRendering: "optimizeLegibility", // テキストの鮮明さを向上
      }}
    >
      {/* Header */}
      <div
        style={{
          fontWeight: "bold",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Backcanvas user={user} />

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            margin: "23px 0",
            width: "100%",

          }}
        >
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                borderBottom: activeTab === tab ? "3px solid #114692" : "none",
                color: activeTab === tab ? "#114692" : "#fff",
                fontWeight: activeTab === tab ? "bold" : "normal",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "15px",
            flex: 1,
            width: "calc(100% - 15px)", // 幅を広げる
            maxHeight: "calc(100vh - 570px)", // 高さを制限
            overflowY: "auto",
          }}
        >
          {activeTab === "商品" && <ProfileProductsView manager={manager}/>}
          {activeTab === "コラボ" && <div>コラボ</div>}
          {activeTab === "Media" && <div>Displaying media...</div>}
          {activeTab === "Likes" && <div>Displaying likes...</div>}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
