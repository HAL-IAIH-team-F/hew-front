import {Client} from "~/api/client/Client";
import {AuthClient} from "~/api/client/auth/AuthClient";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {AuthIdTokenState, IdTokenState} from "~/auth/idtoken/IdTokenState";
import {TokenBundle,} from "~/auth/nextauth/TokenBundle";
import {UnAuthClient} from "~/api/client/UnAuthClient";
import {UserRes} from "~/res/UserRes";

export type ClientState = LoadingClientState | LoadedClientContext;
export type LoadedClientContext = UnregisteredClientState | UnAuthClientState | RegisteredClientState

export function newLoadingClientState(idToken: IdTokenState): LoadingClientState {
  return {
    state: "loading",
    client: new UnAuthClient(),
    idToken: idToken,
  }
}

interface LoadingClientState extends ClientStateBase {
  state: "loading",
  client: Client,
}

export function newUnregisteredClientState(
  oidcContext: OidcContext, setIdToken: (idToken: IdTokenState) => void,
  signOut: () => void, token: TokenBundle, idToken: IdTokenState
): UnregisteredClientState {
  return {
    state: "unregistered",
    client: new AuthClient(token.access.token),
    oidcContext: oidcContext,
    setIdToken: setIdToken,
    signOut: signOut,
    token: token,
    idToken: idToken,
  }
}

interface UnregisteredClientState extends ClientStateBase {
  state: "unregistered",
  client: AuthClient,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
  signOut: () => void,
  token: TokenBundle,
}

export function newRegisteredClientState(
  oidcContext: OidcContext, setIdToken: (idToken: IdTokenState) => void,
  signOut: () => void, token: TokenBundle, idToken: AuthIdTokenState,user: UserRes
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
  }
}

interface RegisteredClientState extends ClientStateBase {
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
  oidcContext: OidcContext, setIdToken: (idToken: IdTokenState) => void, idToken: IdTokenState
): UnAuthClientState {
  return {
    state: "unauthenticated",
    client: new UnAuthClient(),
    oidcContext: oidcContext,
    setIdToken: setIdToken,
    idToken: idToken,
  }
}

interface UnAuthClientState extends ClientStateBase {
  state: "unauthenticated",
  client: UnAuthClient,
  oidcContext: OidcContext,
  setIdToken: (idToken: IdTokenState) => void,
}

interface ClientStateBase {
  idToken: IdTokenState
}