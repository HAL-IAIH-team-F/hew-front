import {Dispatch, SetStateAction, useState} from "react";
import RefreshTokenLoader from "~/auth/refresh/RefreshTokenLoader";
import OpWatcher from "~/auth/OpFrame/OpWatcher";
import {AuthIdTokenState, IdTokenState} from "../idtoken/IdTokenState";
import IdTokenLoader from "~/auth/idtoken/IdTokenLoader";
import {ClientState} from "~/api/context/ClientState";


export default function SessionPersister(
  {
    update, clientState, setIdToken, idToken, logoutRequest, setLogoutRequestIdToken,
  }: {
    update: (loginSessionUpdate: ClientState) => void,
    setIdToken: (tokenState: IdTokenState) => void,
    clientState: ClientState,
    idToken: IdTokenState,
    logoutRequest: boolean,
    setLogoutRequestIdToken: Dispatch<SetStateAction<AuthIdTokenState | undefined>>
  },
) {
  const [flag, setFlag] = useState(false)

  return (
    <>
      <OpWatcher
        reload={() => setFlag(prevState => !prevState)} clientState={clientState} idToken={idToken}
        logoutRequest={logoutRequest}
      />
      <IdTokenLoader reload={flag} update={setIdToken}/>
      <RefreshTokenLoader
        setClientState={update} idToken={idToken} reload={() => setFlag(prevState => !prevState)}
        clientState={clientState} setIdToken={setIdToken} setLogoutRequestIdToken={setLogoutRequestIdToken}
      />
      {/*<button className={"ml-32 block"} onClick={() => setFlag(prevState => !prevState)}>test</button>*/}
    </>
  )
}