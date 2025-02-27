"use client"
import Link from "next/link";
import {useEffect, useRef} from "react";


export default function Page(
  {params}: { params: { mode: string } }
) {
  const executed = useRef(false)

  useEffect(() => {
    // if (executed.current) return;
    console.debug("callback page")
    executed.current = true;

    const param = new URLSearchParams(location.hash.slice(1))

    const interval = setInterval(() => {
      target(params).postMessage({
        type: "callback_result",
        param: param.toString()
      }, location.origin)
    }, 1000)
    return () => clearInterval(interval)
  }, []);
  return <div>
    empty page <Link href="/timeline" className={"underline"}>timeline</Link>
  </div>
}

function target(params: { mode: string }) {
  if (params.mode == "iframe") {
    return window.parent
  }
  if (params.mode == "popup") {
    return window.opener
  }
  throw new Error("unknown mode")
}