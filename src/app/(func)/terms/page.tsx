"use client"

import {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

export default function Page(
    {}: {}
) {
  const router = useRouter()
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return
    ref.current = true
    window.open("https://github.com/HAL-IAIH-team-F/terms/blob/main/%E5%88%A9%E7%94%A8%E8%A6%8F%E7%B4%84.md", "_blank")
    router.back()
  }, []);
  return undefined
}