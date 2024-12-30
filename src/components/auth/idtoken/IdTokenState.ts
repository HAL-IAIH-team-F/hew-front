import {
  AuthenticationImplicitFlowIdToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowIdToken";
import {
  AuthenticationImplicitFlowAccessToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowAccessToken";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {LoadingState, State} from "~/auth/State";

export type IdTokenState = AuthIdTokenState
  | LoadingState
  | UnAuthIdTokenState

export interface UnAuthIdTokenState extends State {
  state: "unauthenticated"
  oidcContext: OidcContext
}

export interface AuthIdTokenState extends State {
  state: "authenticated"
  idToken: AuthenticationImplicitFlowIdToken
  accessToken: AuthenticationImplicitFlowAccessToken
  sessionState: string
  oidcContext: OidcContext
}