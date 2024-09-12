// ============================
// Author: injectxr
// Date: 2024-09-12
// Description: Backgroundにおしゃれな図形を表示する
// How to use: インポートして<BackgroundObject /> を全体に入れるだけ
// ============================


import React, { useEffect, useState } from "react";

// 図形の色コード
const colors = ["#F2D06B", "#327AD9", "#52D9CB"];

// Shape 型定義
interface Shape {
  shapeType: "circle" | "rectangle"; // 'circle' または 'rectangle'
  size: number;
  color: string;
  width: number;
  height: number;
  left: number;
  top: number;
}

// 図形が重なっているかチェックする関数
const isOverlapping = (shape1: Shape, shape2: Shape): boolean => {
  return !(
    shape1.left + shape1.width < shape2.left ||
    shape1.left > shape2.left + shape2.width ||
    shape1.top + shape1.height < shape2.top ||
    shape1.top > shape2.top + shape2.height
  );
};

// ランダムな図形を生成する関数
const getRandomShape = (existingShapes: Shape[]): Shape => {
  const shapeType: "circle" | "rectangle" = Math.random() > 0.5 ? "circle" : "rectangle"; // ランダムに 'circle' または 'rectangle'
  const size = Math.floor(Math.random() * 200) + 50; // サイズをランダムに設定
  const color = colors[Math.floor(Math.random() * colors.length)]; // ランダムに色を選ぶ
  const width = shapeType === "circle" ? size : size * 1.5;
  const height = size;

  let left: number, top: number;
  let overlapping: boolean;

  do {
    left = Math.random() * (window.innerWidth - width);
    top = Math.random() * (document.documentElement.scrollHeight - height);
    const newShape: Shape = { shapeType, size, color, width, height, left, top }; // 型を 'Shape' に適合
    overlapping = existingShapes.some((shape) => isOverlapping(newShape, shape));
  } while (overlapping);

  return {
    shapeType,
    size,
    color,
    width,
    height,
    left,
    top,
  };
};

// BackgroundObjectコンポーネント
const BackgroundObject: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]); // Shape 型の配列を指定

  const generateShapes = () => {
    const generatedShapes: Shape[] = []; // 型を Shape[] に明示的に指定
    for (let i = 0; i < 30; i++) {
      generatedShapes.push(getRandomShape(generatedShapes));
    }
    setShapes(generatedShapes);
  };

  useEffect(() => {
    generateShapes(); // 初回の図形生成

    const handleResize = () => {
      generateShapes(); // ウィンドウサイズ変更時に再生成
    };

    window.addEventListener("resize", handleResize); // リサイズイベントリスナーの追加

    return () => {
      window.removeEventListener("resize", handleResize); // クリーンアップ
    };
  }, []);

  return (
    <div
      className="absolute w-full h-full"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            width: shape.width + "px",
            height: shape.height + "px",
            backgroundColor: shape.color,
            borderRadius: shape.shapeType === "circle" ? "50%" : "0%",
            left: shape.left + "px",
            top: shape.top + "px",
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundObject;