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
        token.keycloak_access_token = account.access_token
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
      session.keycloak_access_token = token.keycloak_access_token
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
    keycloak_id_token?: string
    access?: {
      token: string,
      expire: string
    },
    refresh?: {
      token: string,
      expire: string
    },
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    keycloak_access_token?: string
    keycloak_id_token?: string
  }
}