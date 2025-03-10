"use client"
import {createContext, ReactNode, Suspense, useContext, useEffect, useState} from "react";
import SessionPersister from "~/auth/session/SessionPersister";
import {AuthIdTokenState, IdTokenState} from "~/auth/idtoken/IdTokenState";
import LogoutFrame from "~/auth/logout/LogoutFrame";
import {ClientState, newLoadingClientState} from "~/api/context/ClientState";
import UnregisteredUserRedirect from "~/api/context/UnregisteredUserRedirect";

export interface ClientContextProviderProps {
    children: ReactNode;
}

const Context = createContext<ClientState>(newLoadingClientState({state: "loading"}));

export function ClientContextProvider(
    {
        children,
    }: ClientContextProviderProps
) {
    const [idToken, setIdToken] = useState<IdTokenState>({state: "loading"})
    const [clientState, setClientState] = useState<ClientState>(() => {
        return newLoadingClientState({
            state: "loading",
        })
    })
    const [requestIdToken, setLogoutRequestIdToken] = useState<AuthIdTokenState>()

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
            <Suspense>
                <UnregisteredUserRedirect/>
            </Suspense>
        </Context.Provider>
    </>;
}

export function useClientState() {
    return useContext(Context);
}
