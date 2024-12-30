"use client"
import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import SessionPersister from "~/auth/session/SessionPersister";
import {AuthSession, LoginSession, UnAuthSession} from "~/auth/session/refresh/LoginSession";
import {Client} from "~/api/client/Client";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {UnAuthClient} from "~/api/client/UnAuthClient";
import {AuthClient} from "~/api/client/AuthClient";
import {AuthIdTokenState, IdTokenState} from "~/auth/idtoken/IdTokenState";
import LogoutFrame from "~/auth/logout/LogoutFrame";

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
  const [requestIdToken, setRequestIdToken] = useState<AuthIdTokenState>()

  const ClientContextState = useMemo<ClientContextState>(() => {
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
      signOut: () => {
        setRequestIdToken(loginSession.idToken)
      }
    };
  }, [loginSession]);
  useEffect(() => {
    if (loginSession.state != "unauthenticated") return
    setRequestIdToken(undefined)
  }, [loginSession.state]);
  return <>
    <SessionPersister
      idToken={idToken} setIdToken={setIdToken} loginSession={loginSession} update={setLoginSession}
      logoutRequest={requestIdToken != undefined}
    />
    {
      idToken.state == "authenticated" &&
      <LogoutFrame idToken={requestIdToken} onLogout={() => {
        setRequestIdToken(undefined)
      }}/>
    }
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
} | AuthClientContext | UnAuthClientContext
export type LoadedClientContext = AuthClientContext | UnAuthClientContext

interface AuthClientContext {
  state: "authenticated",
  client: AuthClient,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
  loginSession: AuthSession,
  signOut: () => void,
}

interface UnAuthClientContext {
  state: "unauthenticated",
  client: UnAuthClient,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
  loginSession: UnAuthSession,
}