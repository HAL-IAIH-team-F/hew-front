import { useControls } from 'leva';
import React, { FC, useEffect, useRef, VFC } from 'react';
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { DistortionPass } from '../../components/postprocessing/DistortionPass';
import { RipplePass } from "../../components/postprocessing/RipplePass"

extend({ EffectComposer, RenderPass, ShaderPass })

export const Effect: FC = () => {
	const dist_datas = useControls('Distortion', {
		enabled: true,
		progress: { value: 0, min: 0, max: 1, step: 0.01 },
		scale: { value: 1, min: 0, max: 5, step: 0.01 }
	})

	const ripple_datas = useControls('Ripple', {
		enabled: true
	})

	const composerRef = useRef<EffectComposer>(null)
	const { gl, scene, camera, size } = useThree()
	useEffect(() => {
		composerRef.current!.setSize(size.width, size.height)
	}, [size])

	useFrame(() => {
		composerRef.current!.render()
	},1)

	return (
		<effectComposer ref={composerRef} args={[gl]}>
			<renderPass attach="passes" args={[scene, camera]} />
			<DistortionPass {...dist_datas} />
			<RipplePass {...ripple_datas} />
		</effectComposer>
	)
}