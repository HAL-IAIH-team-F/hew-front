import {
  AuthenticationImplicitFlowIdToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowIdToken";
import {
  AuthenticationImplicitFlowAccessToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowAccessToken";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";

export type IdTokenState = AuthenticatedIdTokenState
  | { state: "loading" }
  | {
  state: "unauthenticated"
  oidcContext: OidcContext
}

export interface AuthenticatedIdTokenState {
  state: "authenticated"
  idToken: AuthenticationImplicitFlowIdToken
  accessToken: AuthenticationImplicitFlowAccessToken
  sessionState: string
  oidcContext: OidcContext
}