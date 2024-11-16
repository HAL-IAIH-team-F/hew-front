import React, { FC, VFC } from 'react';
import * as THREE from 'three';
import { Plane, useTexture } from '@react-three/drei';

export const ImagePlane: FC = () => {
	const textures = useTexture(["/thum1.jpg", "/thum2.jpg", "/thum3.jpg"])
	const material = (texture: THREE.Texture) =>
		new THREE.ShaderMaterial({
			uniforms: {
				u_texture: { value: texture }
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		})

		return (
			<>
				{textures.map((texture, index) => (
					<Plane key={index} args={[3, 3]} position={[index * 4 - 4, 0, 0]} scale={1}>
						<meshBasicMaterial map={texture} transparent />
					</Plane>
				))} 
			</>
	)
}

// --------------------------------------------------------
const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform sampler2D u_texture;
varying vec2 v_uv;

void main() {
  vec4 color = texture2D(u_texture, v_uv);
  gl_FragColor = color;
}
`