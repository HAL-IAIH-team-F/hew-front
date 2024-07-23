import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak";

const handler = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_ID as string,
      clientSecret: process.env.KEYCLOAK_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
    })
  ]
})

export {handler as GET, handler as POST}