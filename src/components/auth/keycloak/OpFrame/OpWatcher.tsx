import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";
import {useEffect, useRef} from "react";
import {useSession} from "next-auth/react";
import useMessageEvent from "~/auth/keycloak/hook/useMessageEvent";

export default function OpWatcher(
  {
    reload,
  }: {
    reload: () => void
  },
) {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const session = useSession()
  useEffect(() => {
    const element = ref.current
    if (!element) return;
    if (session.status != "authenticated") return;
    const session_state = session.data.session_state
    const win = element.contentWindow
    const interval = setInterval(() => {
      win?.postMessage(`${KeycloakConfig.clientId} ${session_state}`, {targetOrigin: new URL(KeycloakConfig.baseUrl).origin})
    }, 3 * 1000)

    return () => {
      clearInterval(interval)
    };
  }, [ref.current, session.status, session.data?.session_state]);
  useMessageEvent(evt => {
    if (evt.origin !== new URL(KeycloakConfig.baseUrl).origin) return
    if (evt.data == "unchanged") return
    if (evt.data == "changed") {
      reload()
      return;
    }
    console.error("op watch error", evt.data)
  }, [])
  return (
    <iframe className={"hidden"} src={new URL(
      `/realms/${KeycloakConfig.realms}/protocol/openid-connect/login-status-iframe.html`,
      KeycloakConfig.baseUrl
    ).toString()} ref={ref} sandbox={"allow-scripts allow-same-origin allow-storage-access-by-user-activation"}/>
  )
}

