import handleCallbackEvent from "@/(func)/auth/callback/[mode]/handleCallbackEvent";
import {
  AuthenticationImplicitFlowUrl
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowUrl";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {IdTokenState} from "~/auth/idtoken/IdTokenState";

export namespace IdTokenUtl {
  export function receiveMessage(
    target: Window, url: AuthenticationImplicitFlowUrl,
    onFinish: () => void,
    oidcContext: OidcContext, setIdToken: (idToken: IdTokenState) => void
  ) {
    const listener = (evt: MessageEvent) => {
      if (evt.origin !== location.origin) return;
      handleCallbackEvent(evt, data => {
        target.postMessage(data, location.origin)
      }, oidcContext, url.nonce, setIdToken, () => {
        onFinish()
        window.removeEventListener("message", listener)
      })
    }
    window.addEventListener("message", listener, false)
  }
}