"use client";
import { Canvas } from "@react-three/fiber";
import Animation from "./Animation";
import FoamWithCircle from "./FoamWithCircle";
import useWindow from "../../../util/hook/useWindow";

export interface LoadedProps {
  scale?: number;
}

// カメラの視野に収まるように位置を生成
function getRandomPosition(existingPositions: [number, number, number][], cameraZ = 10, fov = 75, aspectRatio = 1.77): [number, number, number] {
  const z = cameraZ - 1; // カメラから少し手前に設定
  const maxY = Math.tan(fov * Math.PI / 360) * z; // Y座標の最大値
  const maxX = maxY * aspectRatio; // X座標の最大値
  let position: [number, number, number];
  let tooClose: boolean;

  do {
    position = [
      (Math.random() * 2 - 1) * maxX,
      (Math.random() * 2 - 1) * maxY,
      z
    ];
    tooClose = existingPositions.some(pos => 
      Math.sqrt(
        (pos[0] - position[0]) ** 2 +
        (pos[1] - position[1]) ** 2
      ) < 1.5 // 最小距離を設定
    );
  } while (tooClose);

  return position;
}

export default function Loaded({
  scale = 1,
}: LoadedProps) {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < 20; i++) {
    positions.push(getRandomPosition(positions));
  }

  return (
    <Animation>
      <group scale={[scale, scale, scale]}>
      <ambientLight args={[0xffffff, 0.0001]} position={[0, 0, 10]}/>
        {positions.map((position, index) => (
          <FoamWithCircle key={index} texturePath={"/2020-01-01_09.26.42.png"} position={position} />
        ))}
      </group>
    </Animation>
  );
}
