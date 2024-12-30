"use client"

import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";

export namespace Oidc {
  export async function context() {
    return await OidcContext.instance(
      KeycloakConfig.clientId,
      new URL("/auth/callback/message", location.href)
    )
  }
}
