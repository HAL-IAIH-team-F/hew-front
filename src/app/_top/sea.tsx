"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import UIContainer from "./UIContainer";
import { DescriptionButton } from "./Description";
import { SeaScene } from "./SeaScene";


const Sea = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleButtonClick = () => {
    setButtonClicked((prev) => !prev); 
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas style={{ position: "absolute", top: 0, left: 0 }}>
        <SeaScene onButtonClick={buttonClicked} /> 
      </Canvas>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <UIContainer onButtonClick={buttonClicked} />
        <DescriptionButton onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default Sea;
