import "next-auth/jwt";

// export const nextAuth = NextAuth({
//   providers: [
//     Keycloak({
//       clientId: KeycloakConfig.clientId,
//       clientSecret: KeycloakConfig.clientSecret,
//       issuer: KeycloakConfig.issuerStr
//     })
//   ],
//   trustHost: true,
//   callbacks: {
//     jwt: NextAuthCallbacks.jwt,
//     session: NextAuthCallbacks.session,
//   }
// })
//
// export const {
//   handlers, auth,
// } = nextAuth
// declare module "next-auth" {
//   interface Session {
//     apiTokens?: TokenBundle
//     loaded?: boolean
//     keycloakTokenBundle?: TokenBundle
//     keycloak_id_token?: string
//     session_state?: string
//     user?: {
//       id?: string
//     }
//   }
//
//   interface Account {
//     refresh_expires_in: number
//     session_state?: string
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT {
//     apiTokens?: TokenBundle
//     loaded?: boolean
//     keycloakTokenBundle?: TokenBundle
//     keycloak_id_token?: string
//     session_state?: string
//   }
// }
