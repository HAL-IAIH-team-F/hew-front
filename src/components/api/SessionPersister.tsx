"use client"
import {keycloakConfig} from "~/auth/auth";
import {useEffect, useRef} from "react";
import {useSession} from "next-auth/react";

export default function SessionPersister(
  {}: {},
) {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const session = useSession()
  useEffect(() => {
    const element = ref.current
    if (!element) return;
    const session_state = session.data?.session_state
    const win = element.contentWindow
    const interval = setInterval(() => {
      console.debug("send", `${keycloakConfig.clientId} ${session_state}`, win)
      win?.postMessage(`${keycloakConfig.clientId} ${session_state}`, {targetOrigin: "*"})
      // win?.postMessage(`${keycloakConfig.clientId} ${session_state}`, {targetOrigin: new URL(keycloakConfig.baseUrl).origin})
    }, 3 * 1000)

    function receive(e: Event) {
      console.debug(e)
      if (!(e instanceof MessageEvent)) return
      if (e.origin !== new URL(keycloakConfig.baseUrl).origin) return
      console.debug(e.data)
    }

    window.addEventListener("message", receive, false)
    return () => {
      clearInterval(interval)
      window.removeEventListener("message", receive)
    };
  }, [ref.current, session.data?.session_state]);
  return (
    <>
      <iframe className={"hidden"} src={new URL(
        `/realms/${keycloakConfig.realms}/protocol/openid-connect/login-status-iframe.html`,
        keycloakConfig.baseUrl
      ).toString()} ref={ref} sandbox={"allow-scripts allow-same-origin allow-storage-access-by-user-activation"} />
    </>
  )
}
