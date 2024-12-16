import {OidcInternal,} from "~/auth/keycloak/api/internal/OidcInternal";

export class AbstractAuthenticateIdAccessFlowToken {
  protected constructor(
    readonly claims: OidcInternal.JWTPayload,
    readonly token: string,
    readonly expireDate: Date,
  ) {
  }
}