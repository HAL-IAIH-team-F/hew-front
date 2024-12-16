import {RefObject} from "react";
import useTimelineAnimation from "@/timeline/useTimelineAnimation";
import { Manager } from "../../components/manager/manager";

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
