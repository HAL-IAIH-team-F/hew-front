import {useEffect, useRef, useState} from "react";
import {IdTokenUtl} from "~/auth/idtoken/IdTokenUtl";
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import {
  AuthenticationImplicitFlowUrl
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowUrl";
import {LoadedClientState} from "~/api/context/ClientState";

export default function SignInFrame(
    {
      clientState,onSignIn,
    }: {
      clientState: LoadedClientState,
      onSignIn?: () => void,
    },
) {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    // console.debug("signInFrame start", clientState, ref, url)
    if (ref.current == undefined) return
    if (ref.current.contentWindow == undefined) return;
    const nonce = new Nonce(window)
    const authenticationImplicitFlowUrl = new AuthenticationImplicitFlowUrl(nonce, "login", "iframe")
    setUrl(authenticationImplicitFlowUrl.url().toString())
    IdTokenUtl.receiveMessage(ref.current.contentWindow, authenticationImplicitFlowUrl, () => {
      // console.debug("idTokenLoader finish")
      setUrl(undefined)
      onSignIn?.()
    }, clientState.oidcContext, clientState.setIdToken)
  }, [ref.current?.contentWindow == undefined, clientState.state]);

  return (
      <iframe ref={ref} src={url} className={"w-full h-full"}/>
  )
}
