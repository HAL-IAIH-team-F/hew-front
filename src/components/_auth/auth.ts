import NextAuth from "next-auth";
import "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";


const realms = process.env.NEXT_PUBLIC_KEYCLOAK_REALMS
const baseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_BASEURL

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
    async jwt({token, account}) {
      if (account) {
        token.keycloak_refresh_token = account.refresh_token
        token.keycloak_id_token = account.id_token
      }

      if (account?.access_token) {
        // const res = await refreshClient(account.access_token)
        // token.refresh_token = res.refresh.token
        // token.access_token = res.access.token
      } else {
        token.refresh_token = undefined
        token.access_token = undefined
      }
      return token
    },
    async session({session, token}) {
      if (session == undefined) return session
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.keycloak_id_token = token.keycloak_id_token
      session.keycloak_refresh_token = token.keycloak_refresh_token
      session.refresh_token = token.refresh_token
      session.access_token = token.access_token
      return session;
    },
  }
})

export const {
  handlers, auth,
} = nextAuth
declare module "next-auth" {
  interface Session {
    keycloak_refresh_token?: string
    keycloak_id_token?: string
    refresh_token?: string
    access_token?: string
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    keycloak_refresh_token?: string
    keycloak_id_token?: string
    refresh_token?: string
    access_token?: string
  }
}