import {TokenBundle} from "~/auth/nextauth/TokenBundle";

export type LoginSession = Loading | UnauthenticatedSession | AuthenticatedSession


export interface Loading {
  state: "loading"
}

interface UnauthenticatedSession {
  state: "unauthenticated"
}

export interface AuthenticatedSession {
  state: "authenticated"
  token: TokenBundle
}