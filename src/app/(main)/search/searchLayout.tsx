"use client";
// components/Layout.tsx
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SerchProductView from "./SerchProductView";

interface SearchLayoutProps {
  children: React.ReactNode;
}

const SearchLayout: React.FC<SearchLayoutProps> = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 入力された検索ワード

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 820); // 768px以下をモバイルビューとする
    };

    handleResize(); // 初回実行
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen relative bg-black">
      {/* 検索バー */}
      <div
        className={`${
          isMobileView
            ? "fixed top-0 left-0 w-full z-20 bg-black h-20" // 高さを固定
            : "absolute top-0 z-10 bg-black h-20"
        } text-white p-4 flex flex-col justify-center`}
      >
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="検索する"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // 入力が変わるたびに更新
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* コンテンツ */}
      <div
        className={`bg-black text-white ${
          isMobileView ? "pt-20" : "h-screen pt-20" // 検索バーの高さ分だけpadding
        }`}
      >
        <SerchProductView Search={searchQuery} />
      </div>
    </div>
  );
};

export default SearchLayout;
