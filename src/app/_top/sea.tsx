"use client";
import React, {useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";
import UIContainer from "./UIContainer";
import {DescriptionButton} from "./Description";
import {SeaScene} from "./SeaScene";
import {useClientState} from "~/api/context/ClientContextProvider";


const Sea = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を管理
  const clientContext = useClientState();
  const [isVisible, setIsVisible] = useState(true); // フェードアウト用
  const handleButtonClick = () => {
    setButtonClicked((prev) => !prev);
  };
  useEffect(() => {
    if (clientContext.state !== "registered") return
    setIsAuthenticated(true);
    setTimeout(() => setIsVisible(false), 2000); // フェードアウト後に非表示
  }, [clientContext.state]);

  return (
    <div style={{width: "100vw", height: "100vh", position: "relative"}}>
      <Canvas style={{position: "absolute", top: 0, left: 0}}>
        <SeaScene onButtonClick={buttonClicked}/>
      </Canvas>
      {isVisible && (
        <div
          style={{
            ...styles.container,
            ...(isAuthenticated ? styles.fadeOut : {}),
          }}
        >
          <UIContainer onButtonClick={buttonClicked}/>
          <DescriptionButton onClick={handleButtonClick}/>
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
    transition: "opacity 1s ease-out, visibility 1s ease-out",
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
