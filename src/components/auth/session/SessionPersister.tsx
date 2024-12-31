
import {useState} from "react";
import RefreshTokenLoader from "~/auth/refresh/RefreshTokenLoader";

import {LoginSession} from "~/auth/refresh/LoginSession";
import OpWatcher from "~/auth/OpFrame/OpWatcher";
import { IdTokenState } from "../idtoken/IdTokenState";
import IdTokenLoader from "~/auth/idtoken/IdTokenLoader";

export default function SessionPersister(
  {
    update, loginSession, setIdToken, idToken,logoutRequest,
  }: {
    update: (loginSessionUpdate: LoginSession) => void,
    setIdToken: (tokenState: IdTokenState) => void,
    loginSession: LoginSession,
    idToken: IdTokenState,
    logoutRequest: boolean,
  },
) {
  const [flag, setFlag] = useState(false)

  return (
    <>
      <OpWatcher
        reload={() => setFlag(prevState => !prevState)} loginSession={loginSession} idToken={idToken}
        logoutRequest={logoutRequest}
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