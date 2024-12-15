"use client"
import {createContext, ReactNode, useContext, useMemo, useState} from "react";
import SessionPersister from "~/auth/session/SessionPersister";
import {LoginSession} from "~/auth/session/refresh/LoginSession";
import {ClientContext} from "~/api/context/ClientContext";
import {IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";

export interface ClientContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ClientContextState>({
  state: "loading",
  context: new ClientContext({state: "loading"}, {state: "loading"}),
});

export function ClientContextProvider(
  {
    children,
  }: ClientContextProviderProps
) {
  const [loginSession, setLoginSession] = useState<LoginSession>({state: "loading"})
  const [idToken, setIdToken] = useState<IdTokenState>({state: "loading"})

  const ClientContextState = useMemo<ClientContextState>(() => {
    if (idToken.state == "loading") return {
      state: "loading",
      context: new ClientContext(loginSession, idToken),
    }
    if (loginSession.state == "loading") return {
      state: "loading",
      context: new ClientContext(loginSession, idToken),
    }
    if (loginSession.state == "unauthenticated") return {
      state: "unauthenticated",
      context: new ClientContext(loginSession, idToken),
      oidcContext: idToken.oidcContext,
      setIdToken: setIdToken,
    }
    return {
      state: "authenticated",
      context: new ClientContext(loginSession, idToken),
      oidcContext: idToken.oidcContext,
      setIdToken: setIdToken,
    };
  }, [loginSession]);
  return <>
    <SessionPersister idToken={idToken} setIdToken={setIdToken} loginSession={loginSession} update={setLoginSession}/>
    <Context.Provider
      value={ClientContextState}
    >
      {children}
    </Context.Provider>
  </>;
}

export function useClientContextState() {
  return useContext(Context);
}

export type ClientContextState = {
  state: "loading",
  context: ClientContext,
} | {
  state: "authenticated",
  context: ClientContext,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
} | {
  state: "unauthenticated",
  context: ClientContext,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
}