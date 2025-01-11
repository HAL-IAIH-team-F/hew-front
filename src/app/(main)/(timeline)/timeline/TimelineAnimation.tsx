import {RefObject} from "react";
import {Manager} from "~/manager/manager";
import useTimelineAnimation from "@/(main)/(timeline)/timeline/useTimelineAnimation";

export default function TimelineAnimation(
  {
    manager,
    mountRef,
  }: TimelineAnimationProps,
) {// Effectsの参照を追加
  useTimelineAnimation(manager,mountRef)
  return (
    <></>
  )
}

export interface TimelineAnimationProps {
  manager: Manager
  mountRef: RefObject<HTMLDivElement | null>
}
