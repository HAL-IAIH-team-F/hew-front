import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import {ReactNode, useMemo} from "react";
import useWindow from "../../../util/hook/useWindow";

export default function Animation(
  {
    children,
  }: AnimationProps,
) {
  const {camera, gl} = useThree();
  const window = useWindow();

  useMemo(() => {
    if (window == undefined) return
    // ウィンドウのリサイズ時にカメラとレンダラーを更新するイベントリスナーを作成
    const handleResize = () => {
      const {innerWidth, innerHeight} = window;
      // camera.aspect = innerWidth / innerHeight;
      gl.setPixelRatio(window.devicePixelRatio);
      (camera as THREE.PerspectiveCamera).aspect = window.innerWidth / window.innerHeight;
      gl.setSize(innerWidth, innerHeight);
      camera.updateProjectionMatrix();
    };

    // リスナーを追加
    window.addEventListener('resize', handleResize);

    // コンポーネントのクリーンアップ時にリスナーを削除
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [camera, gl, window]);

  useMemo(() => {
    gl.shadowMap.enabled = true;
  }, [gl]);

  return (
    <>
      {children}
    </>
  )
}

export interface AnimationProps {
  children?: ReactNode
}

 