import Foam from "./Foam.tsx";
import {Vector3} from "@react-three/fiber";
import {useMemo} from "react";
import * as THREE from "three";
import setFoamNoise from "./setFoamNoise.ts";
import {useTexture} from "@react-three/drei";

export default function FoamWithCircle(
  {
    position,
    radius,
    texturePath,
  }: FoamWithCircleProps,
) {
  if (!position) position = [0, 0, 0]
  if (!radius) radius = 1

  const geometry = useMemo(() => {
    return new THREE.CircleGeometry(radius, 64);
  }, []);
  const baseAttribute = useMemo(() => geometry?.getAttribute('position')?.clone(), [geometry])

  const texture = useTexture(texturePath)

  return (
    <>
      <Foam position={position}
            onFoamFrame={(time, spikes, simplex) => {
              setFoamNoise(baseAttribute, geometry, simplex, spikes, time)
            }}
      />
      <mesh position={position} geometry={geometry}>
        <meshBasicMaterial map={texture}/>
      </mesh>
    </>
  )
}

export interface FoamWithCircleProps {
  position?: Vector3
  radius?: number
  texturePath: string
}

 