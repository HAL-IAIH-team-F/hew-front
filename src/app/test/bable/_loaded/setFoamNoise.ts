import {BufferAttribute, BufferGeometry} from "three";
import * as THREE from "three";

export default function setFoamNoise(
  baseAttribute: BufferAttribute,
  geometry: BufferGeometry,
  simplex: (x: number, y: number, z: number) => number,
  spikes: number,
  time: number,
) {
  const positionAttribute = geometry.getAttribute('position');
  const vector = new THREE.Vector3();
  for (let i = 0; i < baseAttribute.count; i++) {
    vector.fromBufferAttribute(baseAttribute, i);//頂点を取り出す
    const noise = simplex(vector.x * spikes, vector.y * spikes, vector.z * spikes + time);
    const ratio = noise * 0.05 + 0.98;
    vector.multiplyScalar(ratio);//ベクトルの各要素をratio乗する
    positionAttribute.setXYZ(i, vector.x, vector.y, vector.z)//頂点座標を更新
  }
  positionAttribute.needsUpdate = true;
}