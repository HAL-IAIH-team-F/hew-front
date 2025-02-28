import {Client} from "~/api/client/Client";
import {AuthClient} from "~/api/client/auth/AuthClient";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {AuthIdTokenState, IdTokenState} from "~/auth/idtoken/IdTokenState";
import {TokenBundle,} from "~/auth/nextauth/TokenBundle";
import {UnAuthClient} from "~/api/client/UnAuthClient";

import {LoadedClient} from "~/api/client/LoadedClient";
import {SelfUserRes} from "~/res/UserRes";

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

interface UnregisteredClientState extends AbstractLoadedClientState {
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
    signOut: () => void, token: TokenBundle, idToken: AuthIdTokenState, user: SelfUserRes,
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

export interface RegisteredClientState extends AbstractLoadedClientState {
  state: "registered",
  client: AuthClient,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
  signOut: () => void,
  idToken: AuthIdTokenState,
  token: TokenBundle,
  user: SelfUserRes
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

interface UnAuthClientState extends AbstractLoadedClientState {
  state: "unauthenticated",
  client: UnAuthClient,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
}

export type LoadedClientState = UnAuthClientState | RegisteredClientState | UnregisteredClientState

interface AbstractLoadedClientState extends ClientStateBase {
  loaded: true,
  set: (state: ClientState) => void,
  client: LoadedClient,
}

interface ClientStateBase {
  idToken: IdTokenState
  state: string
}