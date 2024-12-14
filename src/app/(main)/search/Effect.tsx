import React, {FC, useEffect, useRef} from 'react';
import {EffectComposer, RenderPass, ShaderPass} from 'three-stdlib';
import {extend, useFrame, useThree} from '@react-three/fiber';
import {RipplePass} from "~/postprocessing/RipplePass";

extend({EffectComposer, RenderPass, ShaderPass})

export const Effect: FC = () => {
  // const dist_datas = useControls('Distortion', {
  // 	enabled: true,
  // 	progress: { value: 0, min: 0, max: 1, step: 0.01 },
  // 	scale: { value: 1, min: 0, max: 5, step: 0.01 }
  // })

  const ripple_datas = {
    enabled: true
  }

  const composerRef = useRef<EffectComposer>(null)
  const {gl, scene, camera, size} = useThree()
  const renderRef = useRef<RenderPass>(null)

  useFrame(() => {
    composerRef.current!.render()
  }, 1)

  useEffect(() => {
    if (!renderRef.current) return
    if (!composerRef.current) return
    const composer = composerRef.current
    const render = renderRef.current

    composer.addPass(render)
    return () => composer.removePass(render);
  }, [renderRef, composerRef]);

  return (
    <>
      <effectComposer ref={composerRef} args={[gl]}/>
      <renderPass attach="passes" args={[scene, camera]} ref={renderRef}/>
      <RipplePass {...ripple_datas} composerRef={composerRef}/>
    </>
  )
}