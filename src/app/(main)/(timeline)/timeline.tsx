"use client";
import {FC, useRef} from "react";
import TimelineCanvas from "./_timeline/TimelineCanvas";


type TimelineProps = {};
export const Timeline: FC<TimelineProps> = ({}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  return (<div ref={mountRef} style={{width: '100vw', height: '100vh'}}>
    <TimelineCanvas mountRef={mountRef}/>
  </div>)

};

