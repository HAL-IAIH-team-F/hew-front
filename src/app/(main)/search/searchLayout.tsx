// components/Layout.tsx
import React, {useEffect, useState} from "react";
import {FaSearch} from "react-icons/fa";

interface searchLayoutProps {
  children: React.ReactNode;
}

const SearchLayout: React.FC<searchLayoutProps> = ({ children }) => {
  const [isMobileView, setIsMobileView] = useState(false);

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
            ? "fixed top-0 left-0 w-full z-20 bg-black"
            : "absolute z-10 bg-black"
        } text-white p-8`}
      >
        <h1 className="text-2xl font-bold mb-4">検索ページ</h1>
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="検索する"
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* コンテンツ */}
      <div
        className={`bg-black text-white ${
          isMobileView ? "pt0" : "h-screen"
        } `}
        id=""
      >
        {children}
      </div>
    </div>
  );
};

export default SearchLayout;
