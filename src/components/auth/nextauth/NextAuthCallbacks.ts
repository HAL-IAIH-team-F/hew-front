import {JWT} from "@auth/core/jwt";
import {Account, Session} from "next-auth";
import {Token} from "~/auth/nextauth/Token";
import {TokenBundleUtil} from "~/auth/nextauth/TokenBundle";
import {NextAuthUpdateSession} from "~/auth/nextauth/NextAuthUpdateSession";

export namespace NextAuthCallbacks {
  export async function jwt(
    {token, account, session}:
    {
      token: JWT, account: Account | null, session?: NextAuthUpdateSession
    }
  ): Promise<JWT> {
    if (account) accountUpdate(token, account)
    if (session) sessionUpdate(token, session)
    return token
  }

  function sessionUpdate(token: JWT, session: NextAuthUpdateSession): JWT {
    if (session.type == undefined) {
      if (session.accessToken) token.accessToken = session.accessToken
      if (session.loaded) token.loaded = session.loaded
      return token
    }
    if (session.type == "login_session") {
      if (session.data.type == "authenticated") {
        token.apiTokens = session.data.token
      }
    }
    return token
  }

  function accountUpdate(token: JWT, account: Account): JWT {
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
    return token
  }

  export async function session({session, token}: { session: Session, token: JWT }): Promise<any> {
    if (session == undefined) return session
    if (token.sub) {
      if (session.user == undefined) session.user = {}
      session.user.id = token.sub;
    }
    session.keycloak_id_token = token.keycloak_id_token
    session.keycloakTokenBundle = token.keycloakTokenBundle
    session.apiTokens = token.apiTokens
    session.loaded = token.loaded
    session.session_state = token.session_state
    return session;
  }
}