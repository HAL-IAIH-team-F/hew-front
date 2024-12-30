
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";

export class AuthenticationImplicitFlowUrl {

  constructor(
    readonly nonce: Nonce,
    readonly prompt: "none" | "login" = "login",
    readonly mode: "popup" | "iframe",
  ) {
  }

  url() {
    const redirectUrl = new URL(`/auth/callback/${this.mode}`, location.href)
    const url = new URL(
      `/realms/${KeycloakConfig.realms}/protocol/openid-connect/auth`,
      KeycloakConfig.baseUrl
    )
    url.searchParams.append("response_type", "id_token token")
    url.searchParams.append("client_id", KeycloakConfig.clientId)
    url.searchParams.append("redirect_uri", redirectUrl.toString())
    url.searchParams.append("prompt", this.prompt)
    url.searchParams.append("response_mode", "fragment")
    url.searchParams.append("nonce", this.nonce.nonce)
    url.searchParams.append("scope", "openid")
    return url
  }
}