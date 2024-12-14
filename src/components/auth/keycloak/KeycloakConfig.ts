import {Env} from "~/env";

export namespace KeycloakConfig {
  export const clientId = Env.keycloak.clientId
  export const clientSecret = Env.keycloak.clientSecret
  export const baseUrl = Env.keycloak.baseUrl
  export const realms = Env.keycloak.realms
  export const issuerUrl = new URL(`/realms/${Env.keycloak.realms}`, Env.keycloak.baseUrl)
  export const issuerStr = issuerUrl.toString()
}