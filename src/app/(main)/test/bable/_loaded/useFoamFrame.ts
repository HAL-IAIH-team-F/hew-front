import {useFrame} from "@react-three/fiber";
import {BufferAttribute, BufferGeometry} from "three";
import setFoamNoise from "./setFoamNoise";

export default function useFoamFrame(
  speed: number,
  spike: number,
  processing: number,
  geometry: BufferGeometry,
  baseAttribute: BufferAttribute | undefined,
  simplex: (x: number, y: number, z: number) => number,
  onFoamFrame?: (time: number, spikes: number, simplex: (x: number, y: number, z: number) => number) => void
) {
  useFrame(() => {
    if (baseAttribute == undefined) return

    const time = performance.now() * 0.00001 * speed * Math.pow(processing, 3)
    const spikes = spike * processing;
    setFoamNoise(baseAttribute, geometry, simplex, spikes, time);
    onFoamFrame && onFoamFrame(time, spikes, simplex)
  })

}
