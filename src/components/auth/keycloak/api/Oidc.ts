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
  export function createAuthUrl(nonce: string) {
    const redirectUrl = new URL("/auth/callback/message", location.href)

    const url = new URL(
      `/realms/${KeycloakConfig.realms}/protocol/openid-connect/auth`,
      KeycloakConfig.baseUrl
    )
    url.searchParams.append("response_type", "id_token token")
    url.searchParams.append("client_id", KeycloakConfig.clientId)
    url.searchParams.append("redirect_uri", redirectUrl.toString())
    url.searchParams.append("prompt", "none")
    url.searchParams.append("response_mode", "fragment")
    url.searchParams.append("nonce", nonce)
    return url
  }
}
