"use client";
import React, {useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {DescriptionButton} from "./Description";
import {SeaScene} from "./SeaScene";
import {Img} from "~/api/context/Api";
import UIContainer from "@/_top/UIContainer";
import {useClientState} from "~/api/context/ClientContextProvider";
import UserRegisterForm from "@/(main)/user/register/UserRegisterForm";

const Sea = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を管理
  const clientContext = useClientState();
  const [isVisible, setIsVisible] = useState(true); // フェードアウト用
  const [user, setUser] = useState<{ id: string; name: string; icon: Img | undefined }>();
  const [isUnregistered, setUnregistered] = useState(false); // フェードアウト用
  const handleButtonClick = () => {
    setButtonClicked((prev) => !prev);
  };

  useEffect(() => {
    console.log(clientContext.state)
    if (clientContext.state !== "registered") return
    setIsAuthenticated(true);
    setTimeout(() => setIsVisible(false), 2000); // フェードアウト後に非表示
  }, [clientContext.state]);

  useEffect(() => {
    if (clientContext.state !== "unregistered") return
    setIsAuthenticated(true);
    setTimeout(() => setIsVisible(false), 2000); // フェードアウト後に非表示
    setTimeout(() => setUnregistered(true), 2000); // 遅延表示

  }, [clientContext.state]);
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", backgroundColor: "black" }}>
      <Canvas style={{ position: "absolute", top: 0, left: 0 }}>
        <SeaScene onButtonClick={buttonClicked} />
      </Canvas>
      {isVisible && (
        <div
          style={{
            ...styles.container,
            ...(isAuthenticated ? styles.fadeOut : {}),
          }}
        >
          <UIContainer onButtonClick={buttonClicked} />
          <DescriptionButton onClick={handleButtonClick} />
        </div>
      )}
      {isUnregistered && (
      <div
        style={{
          ...styles.container,
        }}
      >
        <div style={{ ...styles.frame ,...(isUnregistered ? styles.fadeIn : {})}}>
          <div style={{ ...styles.inframe }}>
            <UserRegisterForm />
          </div>
        </div>
      </div>
    )}
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "opacity 2s ease-out, visibility 2s ease-out",
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
  },
  fadeOut: {
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
  },
  fadeIn: {
    opacity: 1,
    visibility: "visible",
    transition: "opacity 2s ease-in, visibility 2s ease-in",
  },
  frame: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.9)",
    fontFamily: "UDEVGothic, sans-serif",
    opacity: 1,
    zIndex: 6,
    overflow: "hidden", // 子要素がはみ出ないようにする
  },
  inframe: {
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    maxWidth: "90vw", // 親要素を超えない最大幅
    maxHeight: "90vh", // 親要素を超えない最大高さ
    overflow: "auto", // コンテンツが大きい場合はスクロール
    boxSizing: "border-box", // サイズ計算にパディングを含む
  },
};
export default Sea;
