import {RefObject} from "react";
import useTimelineAnimation from "@/(main)/timeline/useTimelineAnimation";

export default function TimelineAnimation(
  {
    mountRef,
  }: TimelineAnimationProps,
) {// Effectsの参照を追加
  useTimelineAnimation(mountRef)
  return (
    <></>
  )
}

export interface TimelineAnimationProps {
  mountRef: RefObject<HTMLDivElement | null>
}
