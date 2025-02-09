import {Client} from "~/api/client/Client";
import {AuthClient} from "~/api/client/auth/AuthClient";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {AuthIdTokenState, IdTokenState} from "~/auth/idtoken/IdTokenState";
import {TokenBundle,} from "~/auth/nextauth/TokenBundle";
import {UnAuthClient} from "~/api/client/UnAuthClient";
import {UserRes} from "~/res/UserRes";
import {LoadedClient} from "~/api/client/LoadedClient";

export type ClientState =
    LoadingClientState
    | UnregisteredClientState
    | UnAuthClientState
    | RegisteredClientState;

export function newLoadingClientState(idToken: IdTokenState): LoadingClientState {
    return {
        state: "loading",
        client: new UnAuthClient(),
        idToken: idToken,
        loaded: false,
    }
}

interface LoadingClientState extends ClientStateBase {
    state: "loading",
    client: Client,
    loaded: false
}

export function newUnregisteredClientState(
    oidcContext: OidcContext, setIdToken: (idToken: IdTokenState) => void,
    signOut: () => void, token: TokenBundle, idToken: AuthIdTokenState,
    set: (state: ClientState) => void,
): UnregisteredClientState {
    return {
        state: "unregistered",
        client: new AuthClient(token.access.token),
        oidcContext: oidcContext,
        setIdToken: setIdToken,
        signOut: signOut,
        token: token,
        idToken: idToken,
        loaded: true,
        set,
    }
}

interface UnregisteredClientState extends LoadedClientState {
    state: "unregistered",
    client: AuthClient,
    oidcContext: OidcContext,
    setIdToken: (idToken: IdTokenState) => void,
    signOut: () => void,
    token: TokenBundle,
    idToken: AuthIdTokenState,
}

export function newRegisteredClientState(
    oidcContext: OidcContext, setIdToken: (idToken: IdTokenState) => void,
    signOut: () => void, token: TokenBundle, idToken: AuthIdTokenState, user: UserRes,
    set: (state: ClientState) => void,
): RegisteredClientState {
    return {
        state: "registered",
        client: new AuthClient(token.access.token),
        oidcContext: oidcContext,
        setIdToken: setIdToken,
        signOut: signOut,
        idToken: idToken,
        token: token,
        user: user,
        loaded: true,
        set,
    }
}

interface RegisteredClientState extends LoadedClientState {
    state: "registered",
    client: AuthClient,
    oidcContext: OidcContext,
    setIdToken: (idToken: IdTokenState) => void,
    signOut: () => void,
    idToken: AuthIdTokenState,
    token: TokenBundle,
    user: UserRes
}

export function newUnAuthClientState(
    oidcContext: OidcContext, setIdToken: (idToken: IdTokenState) => void, idToken: IdTokenState,
    set: (state: ClientState) => void,
): UnAuthClientState {
    return {
        state: "unauthenticated",
        client: new UnAuthClient(),
        oidcContext: oidcContext,
        setIdToken: setIdToken,
        idToken: idToken,
        loaded: true,
        set,
    }
}

interface UnAuthClientState extends LoadedClientState {
    state: "unauthenticated",
    client: UnAuthClient,
    oidcContext: OidcContext,
    setIdToken: (idToken: IdTokenState) => void,
}

export interface LoadedClientState extends ClientStateBase {
    loaded: true,
    set: (state: ClientState) => void,
    client: LoadedClient,
}

interface ClientStateBase {
    idToken: IdTokenState
}