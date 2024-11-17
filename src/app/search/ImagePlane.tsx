import React, { FC, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Plane, useTexture } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import "./serchBar.css"
export const ImagePlane: FC = () => {
  const textures = useTexture([
    "/pic/akasi.jpg",
    "/pic/gyoen.jpg",
    "/pic/asakusa.jpg",
    "/pic/enoshima.jpg",
    "/pic/nagoya.jpg",
    "/pic/shinjuku.jpg",
  ]);

  const [columns, setColumns] = useState(3); // Initial number of columns
  const fixedAspectRatio = 18 / 9; // Target aspect ratio
  const fixedWidth = 1.6; // Fixed width
  const fixedHeight = fixedWidth / fixedAspectRatio; // Fixed height

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1250) {
        setColumns(3); // 3 columns
      } else if (width > 820) {
        setColumns(2); // 2 columns
      } else {
        setColumns(1); // 1 column
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const material = (texture: THREE.Texture) =>
    new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: texture },
        u_aspectRatio: { value: texture.image.width / texture.image.height },
        u_targetAspectRatio: { value: fixedAspectRatio },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

  return (
    <group position={[0, 1.5, 0]}>
      {textures.map((texture, i) => {
        const xOffset = ((i % columns) - (columns - 1) / 2) * 3.3; // Horizontal offset
        const yOffset = -Math.floor(i / columns) * 1.7; // Vertical offset

        // Define the animation using React Spring
        const springProps = useSpring({
          position: [xOffset, yOffset, 0],
          config: { tension: 170, friction: 26 }, // Animation speed and bounce
        });

        return (
          <animated.mesh
            key={i}
            position={springProps.position.to((x, y, z) => [x, y, z])} // Map to a compatible array format
          >
            <Plane args={[fixedWidth * 2, fixedHeight * 2]}>
              <primitive attach="material" object={material(texture)} />
            </Plane>
          </animated.mesh>
        );
      })}
    </group>
  );
};

// Shader code
const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform sampler2D u_texture;
uniform float u_aspectRatio;
uniform float u_targetAspectRatio;
varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  if (u_aspectRatio > u_targetAspectRatio) {
    float scale = u_targetAspectRatio / u_aspectRatio;
    uv.x = uv.x * scale + (1.0 - scale) / 2.0;
  } else {
    float scale = u_aspectRatio / u_targetAspectRatio;
    uv.y = uv.y * scale + (1.0 - scale) / 2.0;
  }

  vec4 color = texture2D(u_texture, uv);
  gl_FragColor = color;
}
`;
