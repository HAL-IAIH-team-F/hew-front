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
    async jwt(
      {token, account, session}:
      {
        token: JWT, account: Account | null, session?: {
          accessToken?: Token
          loaded?: boolean
        }
      }
    ) {
      if (account) {
        console.debug("account", account)
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
        token.session_state = account.session_state
      }

      if (session == undefined) return token
      if (session.accessToken) token.accessToken = session.accessToken
      if (session.loaded) token.loaded = session.loaded
      return token
    },
    async session({session, token}) {
      if (session == undefined) return session
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.keycloak_id_token = token.keycloak_id_token
      session.keycloakTokenBundle = token.keycloakTokenBundle
      session.accessToken = token.accessToken
      session.loaded = token.loaded
      session.session_state = token.session_state
      return session;
    },
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
