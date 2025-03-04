"use client"
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";
import LoginNeed from "~/UI/loginNeed";
import {useClientState} from "~/api/context/ClientContextProvider";

export default function Page(
    {}: {}
) {
  const clientState = useClientState()

  if (clientState.state !== "registered") {
    return (
        <div>
          <LoginNeed/>
        </div>
    )
  }


  return <iframe
      src={`${KeycloakConfig.issuerUrl}/account/`} className={"w-full h-full"}
  />
}