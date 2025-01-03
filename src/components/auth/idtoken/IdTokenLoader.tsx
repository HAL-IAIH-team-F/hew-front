import {useEffect, useRef, useState} from "react";
import {
  AuthenticationImplicitFlowUrl
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowUrl";
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import {IdTokenState} from "~/auth/idtoken/IdTokenState";
import useOidcContext from "~/auth/keycloak/api/useOidcContext";
import {IdTokenUtl} from "~/auth/idtoken/IdTokenUtl";

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

  useEffect(() => {
    console.debug("idTokenLoader start", oidc, ref, url)
    if (oidc == undefined) return
    if (ref.current == undefined) return
    if (ref.current.contentWindow == undefined) return;
    if (url != undefined) return;
    const nonce = new Nonce(window)
    const authenticationImplicitFlowUrl = new AuthenticationImplicitFlowUrl(nonce, "none", "iframe")
    IdTokenUtl.receiveMessage(ref.current.contentWindow, authenticationImplicitFlowUrl, () => {
      console.debug("idTokenLoader finish")
      setUrl(undefined)
    }, oidc, update)
    setUrl(authenticationImplicitFlowUrl.url().toString())
  }, [reload, oidc, ref.current]);

  return (
    <>
      <iframe
        className={"hidden"}
        src={url} ref={ref}
      />
    </>
  )
}
