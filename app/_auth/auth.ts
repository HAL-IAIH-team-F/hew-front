import NextAuth from "next-auth";
import "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";

const realms = process.env.KEYCLOAK_REALMS
const baseUrl = process.env.KEYCLOAK_BASEURL
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
  callbacks: {
    async jwt({token, account}) {
      if (account?.refresh_token) {
        token.refresh_token = account.refresh_token
      }
      return token
    },
    async session({session, token}) {
      if (session == undefined) return session
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.refresh_token = token.refresh_token
      return session;
    },
  }
})

export const {
  handlers, auth,
} = nextAuth
declare module "next-auth" {
  interface Session {
    refresh_token?: string
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    refresh_token?: string
  }
}