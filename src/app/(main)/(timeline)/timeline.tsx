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

