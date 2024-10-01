import NextAuth, {Account} from "next-auth";
import "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";
import {JWT} from "@auth/core/jwt";


const realms = process.env.NEXT_PUBLIC_KEYCLOAK_REALMS
const baseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_BASEURL
export const tokenUrl = new URL(`/realms/${realms}/protocol/openid-connect/token`,baseUrl)
export const keycloakConfig = {
  clientId: process.env.KEYCLOAK_ID as string,
  clientSecret: process.env.KEYCLOAK_SECRET as string,
  baseUrl: baseUrl,
  realms: realms,
  issuer: new URL(`/realms/${realms}`, baseUrl).toString(),
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
    async jwt({token, account}: {token: JWT,account: Account | null}) {
      if (account) {
        token.keycloak_access_token = account.access_token
        token.keycloak_refresh_token = account.refresh_token
        token.keycloak_id_token = account.id_token
        if (account.expires_in)
          token.accessTokenExpires = Date.now() + account.expires_in * 1000
        console.debug(account)
        if (account.refresh_expire_in)
          token.refreshTokenExpires = Date.now() + account.refresh_expires_in * 1000
      }
      return token
    },
    async session({session, token}) {
      if (session == undefined) return session
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.keycloak_id_token = token.keycloak_id_token
      session.keycloak_access_token = token.keycloak_access_token
      session.keycloak_refresh_token = token.keycloak_refresh_token
      session.accessTokenExpires = token.accessTokenExpires
      session.refreshTokenExpires = token.refreshTokenExpires

      return session;
    },
  }
})

export const {
  handlers, auth,
} = nextAuth
declare module "next-auth" {
  interface Session {
    keycloak_access_token?: string
    keycloak_refresh_token?: string
    keycloak_id_token?: string
    accessTokenExpires?: number
    refreshTokenExpires?: number
    access?: {
      token: string,
      expire: string
    },
    refresh?: {
      token: string,
      expire: string
    },
  }
  interface Account {
    refresh_expires_in: number
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    keycloak_access_token?: string
    keycloak_refresh_token?: string
    keycloak_id_token?: string
    accessTokenExpires?: number
    refreshTokenExpires?: number
  }
}
