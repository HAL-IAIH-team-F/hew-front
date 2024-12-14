import NextAuth from "next-auth";
import "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";
import {TokenBundle} from "~/auth/nextauth/TokenBundle";
import {Token} from "~/auth/nextauth/Token";
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";
import {NextAuthCallbacks} from "~/auth/nextauth/NextAuthCallbacks";

export const nextAuth = NextAuth({
  providers: [
    Keycloak({
      clientId: KeycloakConfig.clientId,
      clientSecret: KeycloakConfig.clientSecret,
      issuer: KeycloakConfig.issuerStr
    })
  ],
  trustHost: true,
  callbacks: {
    jwt: NextAuthCallbacks.jwt,
    session: NextAuthCallbacks.session,
  }
})

export const {
  handlers, auth,
} = nextAuth
declare module "next-auth" {
  interface Session {
    accessToken?: Token
    loaded?: boolean
    keycloakTokenBundle?: TokenBundle
    keycloak_id_token?: string
    session_state?: string
    user?: {
      id?: string
    }
  }

  interface Account {
    refresh_expires_in: number
    session_state?: string
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: Token
    loaded?: boolean
    keycloakTokenBundle?: TokenBundle
    keycloak_id_token?: string
    session_state?: string
  }
}
