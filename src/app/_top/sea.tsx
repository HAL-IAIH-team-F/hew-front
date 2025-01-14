"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import UIContainer from "./UIContainer";
import { DescriptionButton } from "./Description";
import { SeaScene } from "./SeaScene";
import { useClientContextState } from "~/api/context/ClientContextProvider";
import { useRouter } from "next/navigation"; // 修正ポイント
import { Api, Img } from "~/api/context/Api";
import { ErrorIds } from "../../util/err/errorIds";

const Sea = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を管理
  const clientContext = useClientContextState();
  const [isVisible, setIsVisible] = useState(true); // フェードアウト用
  const [user, setUser] = useState<{ id: string; name: string; icon: Img | undefined }>();

  const handleButtonClick = () => {
    setButtonClicked((prev) => !prev); 
  };
  useEffect(() => {
    if (clientContext.state !== "authenticated") return 
    setIsAuthenticated(true);
    setTimeout(() => setIsVisible(false), 2000); // フェードアウト後に非表示
  },[clientContext.state]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative",backgroundColor: "black" }}>
      <Canvas style={{ position: "absolute", top: 0, left: 0 }}>
        <SeaScene onButtonClick={buttonClicked}/> 
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
};
export default Sea;
