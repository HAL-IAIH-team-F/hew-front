"use client"
import OpWatcher from "~/auth/keycloak/OpFrame/OpWatcher";
import IdTokenLoader from "~/auth/keycloak/idtoken/IdTokenLoader";
import {useState} from "react";
import RefreshTokenLoader from "~/auth/session/refresh/RefreshTokenLoader";
import {IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";

export default function SessionPersister(
  {}: {},
) {
  const [flag, setFlag] = useState(false)
  const [idToken, setIdToken] = useState<IdTokenState>({state: "loading"})

  return (
    <>
      <OpWatcher reload={() => setFlag(prevState => !prevState)}/>
      <IdTokenLoader reload={flag} update={token => {
        if (token) setIdToken({state: "authenticated", data: token})
        else setIdToken({state: "unauthenticated"})
      }}/>
      <RefreshTokenLoader update={token => {
        console.debug(token)
      }} idToken={idToken}/>
      <button className={"ml-32 block"} onClick={() => setFlag(prevState => !prevState)}>test</button>
    </>
  )
}