import OpWatcher from "~/auth/keycloak/OpFrame/OpWatcher";
import IdTokenLoader from "~/auth/keycloak/idtoken/IdTokenLoader";
import {useState} from "react";
import RefreshTokenLoader from "~/auth/session/refresh/RefreshTokenLoader";
import {IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";
import {LoginSession} from "~/auth/session/refresh/LoginSession";

export default function SessionPersister(
  {
    update, loginSession, setIdToken, idToken,
  }: {
    update: (loginSessionUpdate: LoginSession) => void,
    setIdToken: (tokenState: IdTokenState) => void,
    loginSession: LoginSession,
    idToken: IdTokenState,
  },
) {
  const [flag, setFlag] = useState(false)

  return (
    <>
      <OpWatcher
        reload={() => setFlag(prevState => !prevState)} loginSession={loginSession} idToken={idToken}
      />
      <IdTokenLoader reload={flag} update={setIdToken}/>
      <RefreshTokenLoader
        update={update} idToken={idToken} reload={() => setFlag(prevState => !prevState)}
        loginSession={loginSession}
      />
      {/*<button className={"ml-32 block"} onClick={() => setFlag(prevState => !prevState)}>test</button>*/}
    </>
  )
}