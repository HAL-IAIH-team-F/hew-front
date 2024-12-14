import {SessionContextValue} from "next-auth/react";
import {NextAuthUpdateSession} from "~/auth/nextauth/NextAuthUpdateSession";

export namespace NextAurhUtl {
  export async function updateSession(session: SessionContextValue, update: NextAuthUpdateSession) {
    return await session.update(update)
  }
}