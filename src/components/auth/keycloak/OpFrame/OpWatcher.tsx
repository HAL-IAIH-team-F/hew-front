import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";
import {useEffect, useRef} from "react";
import useMessageEvent from "~/auth/keycloak/hook/useMessageEvent";
import {LoginSession} from "~/auth/session/refresh/LoginSession";
import {IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";

export default function OpWatcher(
  {
    reload, loginSession, idToken,
  }: {
    reload: () => void,
    loginSession: LoginSession,
    idToken: IdTokenState
  },
) {
  const ref = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const element = ref.current
    if (!element) return;
    if (loginSession.state != "authenticated") return;
    if (idToken.state != "authenticated") return;
    const session_state = idToken.sessionState
    const win = element.contentWindow
    const interval = setInterval(() => {
      win?.postMessage(`${KeycloakConfig.clientId} ${session_state}`, {targetOrigin: new URL(KeycloakConfig.baseUrl).origin})
    }, 3 * 1000)

    return () => {
      clearInterval(interval)
    };
  }, [ref.current, loginSession.state, idToken]);
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

