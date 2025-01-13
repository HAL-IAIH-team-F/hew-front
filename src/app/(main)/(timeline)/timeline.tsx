"use client";
import {FC, useRef} from "react";
import TimelineAnimation from "./TimelineAnimation";


type TimelineProps = {};
export const Timeline: FC<TimelineProps> = ({}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  return (<div ref={mountRef} style={{width: '100vw', height: '100vh'}}>
    <TimelineAnimation mountRef={mountRef}/>
  </div>)

};


export const TIMELINE_PATH = "/"

export function joinToTimelinePath(path: string) {
  let result
  if (TIMELINE_PATH.endsWith("/")) result = TIMELINE_PATH.slice(0, -1)
  else result = TIMELINE_PATH
  if (path.startsWith("/")) result += path
  else result += "/" + path
  return result
}
