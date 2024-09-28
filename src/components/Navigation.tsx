// ============================
// components\Navigation.tsx
// Author: injectxr
// Date: 2024-09-12
// Description: 動かせるNavigationの関数コンポーネント
// ============================
"use client"
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {SignInOutButton} from "~/_auth/SignInOutButton";

export function StyledNavigation() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({x: 100, y: 100});
  const [offset, setOffset] = useState({x: 0, y: 0});
  const navRef = useRef<HTMLDivElement | null>(null);
  const notificationCount = 3; // 通知数

  const handleMouseDown = (e: React.MouseEvent) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  const handleButtonClick = (buttonTitle: string) => {
    alert(buttonTitle);
  };

  return (
    <div
      ref={navRef}
      onMouseDown={handleMouseDown}
      className="fixed bg-gray-800 border border-gray-700 rounded-lg shadow-lg cursor-grab"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "270px",
        height: "166px",
        zIndex: 1000,
      }}
    >
      <div className="ml-3 mt-1 mb-1 flex items-center text-white text-left cursor-grab text-sm font-bold"
           style={{color: "#F5F5F5"}}>
        サービス名
      </div>
      <hr className="border-gray-600 w-1000"/>
      <div className="flex justify-between">
        <div className="w-1/2 pr-1 mt-1 ml-2.5">
          <SignInOutButton
            className="font-bold block w-full my-1 py-1 text-left text-xs text-white hover:text-gray-400"
          />

          <button
            className="font-bold block w-full my-1 py-1 text-left relative text-xs text-white hover:text-gray-400"
            onClick={() => handleButtonClick(`通知: ${notificationCount}`)}
          >
            通知
            {notificationCount > 0 && (
              <span className="ml-3 mt-1 mr-1 bg-red-700 text-white text-xxs rounded-full px-1.5 py-0.5">
                {notificationCount}
              </span>
            )}
          </button>

          <button
            className="absolute bottom-1 left-3 text-xs text-slate-400 hover:text-white"
            onClick={() => handleButtonClick("利用規約")}
          >
            利用規約
          </button>
        </div>

        <div className="w-px bg-gray-600 mx-2 h-hull"></div>

        <div className="w-1/2 pl-1 text-right">
          <button
            className="font-bold block w-full my-2 py-1 text-left text-xs text-white hover:text-gray-400"
            onClick={() => handleButtonClick("タイムライン")}
          >
            タイムライン
          </button>
          <button
            className="font-bold block w-full my-2 py-1 text-left text-xs text-white hover:text-gray-400"
            onClick={() => handleButtonClick("商品出品")}
          >
            商品出品
          </button>
          <button
            className="font-bold block w-full my-2 py-1 text-left text-xs text-white hover:text-gray-400"
            onClick={() => handleButtonClick("コラボ")}
          >
            コラボ
          </button>
          <button
            className="font-bold block w-full my-2 py-1 text-left text-xs text-white hover:text-gray-400"
            onClick={() => handleButtonClick("マイページ")}
          >
            マイページ
          </button>
        </div>
      </div>
    </div>
  );
}
