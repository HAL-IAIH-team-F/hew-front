"use client"
import {createContext, ReactNode, useContext, useMemo, useState} from "react";
import SessionPersister from "~/auth/session/SessionPersister";
import {AuthSession, LoginSession, UnAuthSession} from "~/auth/session/refresh/LoginSession";
import {Client} from "~/api/client/Client";
import {IdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {UnAuthClient} from "~/api/client/UnAuthClient";
import {AuthClient} from "~/api/client/AuthClient";

export interface ClientContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ClientContextState>({
  state: "loading",
  client: new Client(),
  loginSession: {state: "loading", idToken: {state: "loading"}},
});

export function ClientContextProvider(
  {
    children,
  }: ClientContextProviderProps
) {
  const [idToken, setIdToken] = useState<IdTokenState>({state: "loading"})
  const [loginSession, setLoginSession] = useState<LoginSession>({state: "loading", idToken: idToken})

  const ClientContextState = useMemo<ClientContextState>(() => {
    console.debug("ClientContextState", loginSession)
    if (loginSession.state == "loading") return {
      state: "loading",
      client: new Client(),
      loginSession: loginSession,
    }
    if (loginSession.state == "unauthenticated") return {
      state: "unauthenticated",
      client: new UnAuthClient(),
      oidcContext: loginSession.idToken.oidcContext,
      setIdToken: setIdToken,
      loginSession: loginSession,
    }
    return {
      state: "authenticated",
      client: new AuthClient(loginSession),
      oidcContext: loginSession.idToken.oidcContext,
      setIdToken: setIdToken,
      loginSession: loginSession,
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
  client: Client,
  loginSession: LoginSession,
} | {
  state: "authenticated",
  client: AuthClient,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
  loginSession: AuthSession,
} | {
  state: "unauthenticated",
  client: UnAuthClient,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
  loginSession: UnAuthSession,
}