"use client"
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";
import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";

export namespace Oidc {
  export async function context() {
    return await OidcContext.instance(
      KeycloakConfig.clientId,
      new URL("/auth/callback/message", location.href)
    )
  }
}
