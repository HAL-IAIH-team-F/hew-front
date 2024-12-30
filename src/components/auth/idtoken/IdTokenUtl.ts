import handleCallbackEvent from "@/auth/callback/[mode]/handleCallbackEvent";
import {LoadedClientContext} from "~/api/context/ClientContextProvider";
import {
  AuthenticationImplicitFlowUrl
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowUrl";

export namespace IdTokenUtl {
  export function receiveMessage(
    target: Window, clientContext: LoadedClientContext, url: AuthenticationImplicitFlowUrl,
    onFinish: () => void
  ) {
    const listener = (evt: MessageEvent) => {
      if (evt.origin !== location.origin) return;
      handleCallbackEvent(evt, data => {
        target.postMessage(data, location.origin)
      }, clientContext.oidcContext, url.nonce, clientContext.setIdToken, () => {
        onFinish()
        window.removeEventListener("message", listener)
      })
    }
    window.addEventListener("message", listener, false)
  }
}