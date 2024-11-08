import NextAuth, {Account} from "next-auth";
import "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";
import {JWT} from "@auth/core/jwt";
import {Env} from "~/env";
import {TokenBundle, TokenBundleUtil} from "~/auth/TokenBundle";
import {Token} from "~/auth/Token";

export const keycloakConfig = {
  clientId: Env.keycloak.clientId,
  clientSecret: Env.keycloak.clientSecret,
  baseUrl: Env.keycloak.baseUrl,
  realms: Env.keycloak.realms,
  issuer: new URL(`/realms/${Env.keycloak.realms}`, Env.keycloak.baseUrl).toString(),
}
export const nextAuth = NextAuth({
  providers: [
    Keycloak({
      clientId: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
      issuer: keycloakConfig.issuer
    })
  ],
  trustHost: true,
  callbacks: {
    async jwt({token, account}: { token: JWT, account: Account | null }) {
      if (account) {
        const access: Token | undefined = account.access_token && account.expires_in ? {
          token: account.access_token,
          expire: Date.now() + account.expires_in * 1000
        } : undefined
        const refresh: Token | undefined = account.refresh_token && account.refresh_expires_in ? {
          token: account.refresh_token,
          expire: Date.now() + account.refresh_expires_in * 1000
        } : undefined

        token.keycloakTokenBundle = TokenBundleUtil.create(access, refresh)
        token.keycloak_id_token = account.id_token
      }
      return token
    },
    async session({session, token}) {
      if (session == undefined) return session
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.keycloak_id_token = token.keycloak_id_token
      session.keycloakTokenBundle = token.keycloakTokenBundle

      return session;
    },
  }
})

export const {
  handlers, auth,
} = nextAuth
declare module "next-auth" {
  interface Session {
    apiTokenBundle?: TokenBundle
    keycloakTokenBundle?: TokenBundle
    keycloak_id_token?: string
  }

  interface Account {
    refresh_expires_in: number
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    keycloakTokenBundle?: TokenBundle
    keycloak_id_token?: string
  }
}
