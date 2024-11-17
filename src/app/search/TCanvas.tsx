import React, { Suspense, useEffect, useState, FC } from 'react';
import { PerspectiveCamera, OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Effect } from "./Effect";
import { ImagePlane } from "./ImagePlane";

export const TCanvas: FC = () => {
  const [aspect, setAspect] = useState(1);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAspect(window.innerWidth / window.innerHeight);
      setDpr(window.devicePixelRatio);
    }
  }, []);

  return (
    <Canvas dpr={dpr}>
      <color attach="background" args={['#000']} />
      <Suspense fallback={null}>
        <ImagePlane />
      </Suspense>
      <Effect />
      <PerspectiveCamera
        position={[0, 0, 2]}
        fov={50}
        aspect={aspect}
        near={0.1}
        far={2000}
      />
    </Canvas>
  );
};
