import {useEffect, useState} from "react";

export default function useWindow() {
  const [win, setWin] = useState<Window | undefined>(undefined)
  useEffect(() => {
    setWin(window)
  }, []);
  return win
}