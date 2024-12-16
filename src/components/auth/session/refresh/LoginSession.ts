import {TokenBundle} from "~/auth/nextauth/TokenBundle";
import {AuthIdTokenState, IdTokenState, UnAuthIdTokenState} from "~/auth/keycloak/idtoken/IdTokenState";
import {LoadingState, State} from "~/auth/State";

export type LoginSession = LoadingSession | UnAuthSession | AuthSession


export interface LoadingSession extends LoadingState {
  idToken: IdTokenState
}

export interface UnAuthSession extends State {
  state: "unauthenticated"
  idToken: UnAuthIdTokenState | AuthIdTokenState
}

export interface AuthSession extends State {
  state: "authenticated"
  token: TokenBundle
  idToken: AuthIdTokenState
}