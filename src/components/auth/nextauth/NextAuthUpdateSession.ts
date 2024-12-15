import {Token} from "~/auth/nextauth/Token";
import {
  AuthenticationImplicitFlowIdToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowIdToken";

export type NextAuthUpdateSession = TokenUpdateOld | TokenUpdate

interface TokenUpdateOld {
  type?: undefined
  accessToken?: Token
  loaded?: boolean
}

interface TokenUpdate {
  type: "token",
  data: AuthenticationImplicitFlowIdToken
}
