import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const {handlers, auth, signIn, signOut} = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_ID as string,
      clientSecret: process.env.KEYCLOAK_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
    })
  ],
  callbacks: {
    async session({session, token}) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  }
})