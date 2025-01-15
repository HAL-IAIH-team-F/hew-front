"use client"
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import SessionPersister from "~/auth/session/SessionPersister";
import {Client} from "~/api/client/Client";
import {AuthIdTokenState, IdTokenState} from "~/auth/idtoken/IdTokenState";
import LogoutFrame from "~/auth/logout/LogoutFrame";
import {ClientState} from "~/api/context/ClientState";

export interface ClientContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ClientState>({
  state: "loading",
  client: new Client(),
  idToken: {
    state: "loading",
  }
});

export function ClientContextProvider(
  {
    children,
  }: ClientContextProviderProps
) {
  const [idToken, setIdToken] = useState<IdTokenState>({state: "loading"})
  const [clientState, setClientState] = useState<ClientState>(() => {
    return {
      state: "loading",
      client: new Client(),
      idToken: {
        state: "loading",
      }
    }
  })
  const [requestIdToken, setLogoutRequestIdToken] = useState<AuthIdTokenState>()

  // const ClientContextState = useMemo<ClientState>(() => {
  //   if (clientState.state == "loading") return {
  //     state: "loading",
  //     client: new Client(),
  //     loginSession: clientState,
  //   }
  //   if (clientState.state == "unauthenticated") return {
  //     state: "unauthenticated",
  //     client: new UnAuthClient(),
  //     oidcContext: clientState.oidcContext,
  //     setIdToken: setIdToken,
  //     loginSession: clientState,
  //   }
  //   return {
  //     state: "unregistered",
  //     client: new AuthClient(clientState),
  //     oidcContext: clientState.oidcContext,
  //     setIdToken: setIdToken,
  //     loginSession: clientState,
  //     signOut: () => {
  //       setLogoutRequestIdToken(clientState.idToken)
  //     }
  //   };
  // }, [clientState]);
  useEffect(() => {
    if (clientState.state != "unauthenticated") return
    setLogoutRequestIdToken(undefined)
  }, [clientState.state]);
  return <>
    <SessionPersister
      idToken={idToken} setIdToken={setIdToken} clientState={clientState} update={setClientState}
      logoutRequest={requestIdToken != undefined} setLogoutRequestIdToken={setLogoutRequestIdToken}
    />
    {
      idToken.state == "authenticated" &&
      <LogoutFrame idToken={requestIdToken} onLogout={() => {
        setLogoutRequestIdToken(undefined)
      }}/>
    }
    <Context.Provider
      value={clientState}
    >
      {children}
    </Context.Provider>
  </>;
}

export function useClientState() {
  return useContext(Context);
}
