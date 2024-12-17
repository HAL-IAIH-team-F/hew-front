import {useEffect, useRef, useState} from "react";
import useOidcContext from "~/auth/keycloak/hook/useOidcContext";
import useCallbackMessage from "~/auth/keycloak/hook/useCallbackMessage";
import {IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";
import {
  AuthenticationImplicitFlowUrl
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowUrl";
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";

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
    setUrl(prevState => {
      if (prevState != undefined) return prevState;
      const nonce = new Nonce(window)
      setNonce(nonce)

      setTimeout(() => setUrl(undefined), 1000 * 30)
      return new AuthenticationImplicitFlowUrl(nonce, "none","iframe").url().toString()
    })
  }, [reload]);
  useCallbackMessage(oidc, nonce, ref.current, update, () => {
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
