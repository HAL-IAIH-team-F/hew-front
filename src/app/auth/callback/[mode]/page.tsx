"use client"
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import useMessageEvent from "~/auth/keycloak/hook/useMessageEvent";

export default function Page(
  {params}: { params: { mode: string } }
) {
  const executed = useRef(false)
  const [result, setResult] = useState<URLSearchParams>()

  useEffect(() => {
    if (executed.current) return;
    executed.current = true;

    const param = new URLSearchParams(location.hash.slice(1))
    setResult(param)
    window.parent.postMessage({
      type: "callback_ready",
    }, location.origin)
  }, []);
  useMessageEvent(evt => {
    if (result == undefined) return
    if (evt.origin != location.origin) return
    // console.debug(evt)
    if (evt.data.type != "callback_request") return

    window.parent.postMessage({
      type: "callback_result",
      param: result.toString()
    }, location.origin)
  }, [result])

  return <div>
    empty page <Link href="/timeline" className={"underline"}>timeline</Link>
  </div>
}