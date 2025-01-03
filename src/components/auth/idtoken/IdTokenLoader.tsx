import {useEffect, useRef, useState} from "react";
import {
  AuthenticationImplicitFlowUrl
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowUrl";
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import {IdTokenState} from "~/auth/idtoken/IdTokenState";
import useOidcContext from "~/auth/keycloak/api/useOidcContext";
import useCallbackMessage from "~/auth/idtoken/hook/useCallbackMessage";

export default function IdTokenLoader(
  {
    reload, update
  }: {
    reload?: boolean, update: (tokenState: IdTokenState) => void
  },
) {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [url, setUrl] = useState<string>()
  const oidc = useOidcContext()
  const [nonce, setNonce] = useState<Nonce>()
  useEffect(() => {
    if (oidc == undefined) return
    setUrl(prevState => {
      console.debug("idTokenLoader", prevState)
      if (prevState != undefined) return prevState;
      const nonce = new Nonce(window)
      setNonce(nonce)

      setTimeout(() => setUrl(undefined), 1000 * 30)
      return new AuthenticationImplicitFlowUrl(nonce, "none", "iframe").url().toString()
    })
  }, [reload, oidc]);
  useCallbackMessage(oidc, nonce, ref.current, update, () => {
    console.debug("idTokenLoader finish")
    setUrl(undefined)
  })
  return (
    <>
      <iframe
        className={"hidden"}
        src={url} ref={ref}
      />
    </>
  )
}
