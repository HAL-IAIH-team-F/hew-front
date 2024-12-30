import {useEffect, useRef, useState} from "react";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {Oidc} from "~/auth/keycloak/api/Oidc";

export default function useOidcContext() {
  const [context, setContext] = useState<OidcContext>()
  const flag = useRef(false);
  useEffect(() => {
    if (flag.current) return;
    flag.current = true;
    Oidc.context().then(setContext).catch(console.error)
  }, []);
  return context
}