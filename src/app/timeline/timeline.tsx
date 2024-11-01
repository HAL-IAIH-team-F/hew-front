"use client";
import {useRef} from "react";
import TimelineAnimation from "@/timeline/TimelineAnimation";

const Timeline = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  return (<div ref={mountRef} style={{width: '100vw', height: '100vh'}}>
    <TimelineAnimation mountRef={mountRef}/>
  </div>)

};
export default Timeline;


