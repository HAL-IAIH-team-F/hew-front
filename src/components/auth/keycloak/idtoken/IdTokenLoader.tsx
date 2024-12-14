import {useEffect, useRef, useState} from "react";
import useOidcContext from "~/auth/keycloak/hook/useOidcContext";
import useCallbackMessage from "~/auth/keycloak/hook/useCallbackMessage";
import {
  AuthenticationImplicitFlowIdToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowIdToken";
import {Oidc} from "~/auth/keycloak/api/Oidc";

export default function IdTokenLoader(
  {
    reload, update
  }: {
    reload?: boolean, update: (token: AuthenticationImplicitFlowIdToken | undefined) => void
  },
) {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [url, setUrl] = useState<string>()
  const oidc = useOidcContext()
  const [nonce, setNonce] = useState("")
  const executing = useRef(false);
  useEffect(() => {
    if (executing.current) return;
    executing.current = true;
    const ary = window.crypto.getRandomValues(new Int32Array(1))
    const nonce = ary[0].toString(36)
    setNonce(nonce)
    setUrl(Oidc.createAuthUrl(nonce).toString())
  }, [reload]);
  useCallbackMessage(oidc, nonce, ref.current, update, executing)

  return (
    <>
      <iframe
        className={"hidden"}
        src={url} ref={ref}
      />
    </>
  )
}
