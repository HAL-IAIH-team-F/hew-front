import * as THREE from "three";
import {useMemo} from "react";
import {Vector3} from "@react-three/fiber";
import {createNoise3D, NoiseFunction3D} from "simplex-noise";
import useFoamFrame from "./useFoamFrame";

export default function Foam(
  {
    speed,
    spike,
    processing,
    position,
    onFoamFrame,
    radius,
    ...props
  }: {
    position?: Vector3,
    radius?: number,
    simplex?: NoiseFunction3D,
    speed?: number,
    spike?: number,
    processing?: number,
    onFoamFrame?: (time: number, spikes: number, simplex: (x: number, y: number, z: number) => number) => void
  }
) {
  if (!position) position = [0, 0, 0]
  if (!radius) radius = 1

  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(radius, 64, 64);
  }, []);
  const positionAttributeBase = useMemo(() => geometry?.getAttribute('position')?.clone(), [geometry])
  const simplex = useMemo(() => {
    if (!props.simplex) return createNoise3D()
    return props.simplex
  }, [props.simplex]);
  if (speed == undefined) speed = 40
  if (spike == undefined) spike = 0.7
  if (processing == undefined) processing = 1.1

  useFoamFrame(speed, spike, processing, geometry, positionAttributeBase, simplex, onFoamFrame)

  const color = 0x91F0FFFF;
  return (
    <mesh geometry={geometry} position={position}>
      {/*<sphereGeometry args={[1.5, 128, 128]} />*/}
      <meshPhysicalMaterial args={[{
        color: color,
        transparent: true,
        side: THREE.DoubleSide,
        transmission: 1.8,//透過率
        metalness: 0,//金属製
        roughness: 0,//粗さ
        // ior: 0,//屈折率
        ior: 1.33,//屈折率
        specularIntensity: 1,//反射量
        specularColor: color,//反射色
      }]}/>
    </mesh>
  )
}