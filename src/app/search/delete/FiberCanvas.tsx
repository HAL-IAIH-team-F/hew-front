import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useState, useEffect } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface FiberCanvasProps {
  imageUrls: string[];
}

const Plane: React.FC<{ texture: THREE.Texture }> = ({ texture }) => {
  const { viewport } = useThree();
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (texture.image) {
      const aspect = texture.image.width / texture.image.height;
      const viewportAspect = viewport.width / viewport.height;

      const planeWidth = viewportAspect > aspect ? viewport.width : viewport.height * aspect;
      const planeHeight = viewportAspect > aspect ? viewport.width / aspect : viewport.height;

      setDimensions({ width: planeWidth, height: planeHeight });
    }
  }, [texture, viewport]);

  const shader = useMemo(() => ({
    uniforms: {
      uTexture: { value: texture },
      time: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float time;
      varying vec2 vUv;
      void main() {
        vec3 color = texture2D(uTexture, vUv).rgb;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  }), [texture]);

  useFrame((_, delta) => {
    shader.uniforms.time.value += delta;
  });

  if (!dimensions) {
    return null; // 画像の読み込みが完了するまでレンダーしない
  }

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[dimensions.width, dimensions.height]} />
      <shaderMaterial attach="material" args={[shader]} />
    </mesh>
  );
};

const FiberCanvas: React.FC<FiberCanvasProps> = ({ imageUrls }) => {
  const texture = useLoader(TextureLoader, imageUrls[0]); // ここでは最初の画像のみを使用
  return (
    <Canvas>
      <Suspense fallback={<div>Loading...</div>}>
        <Plane texture={texture} />
      </Suspense>
    </Canvas>
  );
};

export default FiberCanvas;
