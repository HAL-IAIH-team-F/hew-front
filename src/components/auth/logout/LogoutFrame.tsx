import {useEffect, useRef, useState} from "react";
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";
import {AuthIdTokenState} from "~/auth/idtoken/IdTokenState";

export default function LogoutFrame(
  {
    idToken, onLogout,
  }: {
    idToken: AuthIdTokenState | undefined,
    onLogout: () => void,
  },
) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if (!idToken) return
    if (!frameRef.current) return

    const redirectUrl = new URL("/auth/callback/empty", location.href)
    const searchParams = new URLSearchParams()
    searchParams.append("post_logout_redirect_uri", redirectUrl.toString())
    searchParams.append("id_token_hint", idToken.idToken.token)
    setUrl(new URL(
      `/realms/${KeycloakConfig.realms}/protocol/openid-connect/logout?${searchParams.toString()}`,
      KeycloakConfig.baseUrl
    ).toString())
    onLogout()
  }, [idToken, frameRef]);

  return (
    <iframe ref={frameRef} src={url}/>
  )
}
