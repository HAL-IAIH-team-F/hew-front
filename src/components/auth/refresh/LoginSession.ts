import {LoadingState, State} from "~/auth/State";
import {AuthIdTokenState, IdTokenState, UnAuthIdTokenState} from "~/auth/idtoken/IdTokenState";
import {Token} from "~/auth/nextauth/Token";

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
  token: {
    access: Token
    refresh: Token
  }
  idToken: AuthIdTokenState
}