import {keycloakConfig} from "~/auth/auth";
import {useEffect, useRef} from "react";

export default function SessionPersister(
  {}: {},
) {
  const ref = useRef<HTMLIFrameElement | null>(null);
  const executed = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    if (executed.current) return;
    executed.current = true

ref.current.contentWindow?.postMessage("")

  }, [ref]);
  return (
    <>
      <iframe src={new URL(
        `/realms/${keycloakConfig.realms}/protocol/openid-connect/login-status-iframe.html`,
        keycloakConfig.baseUrl
      ).toString()} ref={ref}/>
    </>
  )
}
