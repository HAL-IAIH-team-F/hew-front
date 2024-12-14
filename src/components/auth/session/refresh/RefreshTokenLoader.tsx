import {IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";
import {useEffect, useState} from "react";
import {RefreshTokenState} from "~/auth/session/refresh/RefreshTokenState";

export default function RefreshTokenLoader(
  {
    update, idToken,
  }: {
    update: (token: RefreshTokenState) => void,
    idToken: IdTokenState,
  },
) {
  const [token, setToken] = useState<RefreshTokenState>({state: "loading"})
  useEffect(() => {
    if (idToken.state == "loading") return;
    if (idToken.state == "unauthenticated") return setToken({state: "unauthenticated"})

  }, [idToken.state]);

  useEffect(() => {
    update(token)
  }, [token]);

  return (
    <div>
    </div>
  )
}
