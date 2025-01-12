"use client";
import {FC, useRef} from "react";
import {Manager} from "~/manager/manager";
import TimelineAnimation from "./TimelineAnimation";


type TimelineProps = {
  manager: Manager
};
const Timeline: FC<TimelineProps> = ({manager}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  return (<div ref={mountRef} style={{width: '100vw', height: '100vh'}}>
    <TimelineAnimation manager={manager} mountRef={mountRef}/>
  </div>)

};
export default Timeline;


