import {useEffect, useState} from "react";

export function useWindowSize() {
  const [size, setSize] = useState<WindowSize>({width: 0, height: 0});
  useEffect(() => {
    const updateSize = (): void => {
      setSize({width: window.innerWidth, height: window.innerHeight});
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export interface WindowSize {
  width: number,
  height: number
}