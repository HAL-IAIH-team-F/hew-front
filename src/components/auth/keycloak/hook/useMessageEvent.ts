"use client"
import {useEffect} from "react";

export default function useMessageEvent(fun: (evt: MessageEvent) => void, deps: any[]) {
  useEffect(() => {
    window.addEventListener("message", fun, false)
    return () => window.removeEventListener("message", fun)
  }, deps)
}