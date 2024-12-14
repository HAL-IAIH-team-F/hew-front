import {
  AuthenticationImplicitFlowIdToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowIdToken";

export type IdTokenState = {
    state: "authenticated"
    data: AuthenticationImplicitFlowIdToken
  }
  | { state: "loading" }
  | { state: "unauthenticated" }