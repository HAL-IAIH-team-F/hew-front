"use client";
import {useRef} from "react";
import {Manager} from "~/manager/manager";
import TimelineAnimation from "@/(main)/(timeline)/timeline/TimelineAnimation";

type TimelineProps = {
  manager: Manager
};
const Timeline: React.FC<TimelineProps> = ({ manager }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  return (<div ref={mountRef} style={{width: '100vw', height: '100vh'}}>
    <TimelineAnimation manager={manager} mountRef={mountRef}/>
  </div>)

};
export default Timeline;


