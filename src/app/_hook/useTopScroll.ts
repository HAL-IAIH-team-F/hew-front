import React, {useEffect, useState} from "react";

export function useTopScroll(ref: React.RefObject<HTMLElement | undefined>) {
  const [scroll, setScroll] = useState<Scroll>({top: 0, left: 0})

  function handler(element: HTMLElement) {
    setScroll({left: element.scrollLeft || 0, top: element.scrollTop || 0});
  }

  useEffect(() => {
    const element = ref?.current
    if (!element) return;

    handler(element);
    element.addEventListener("scroll", () => handler(element));

    return () => element.removeEventListener("scroll", () => handler(element));
  }, []);

  return scroll;
}

export interface Scroll {
  top: number
  left: number
}