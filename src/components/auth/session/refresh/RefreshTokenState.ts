export type RefreshTokenState = {
    state: "loading"
  }
  | { state: "authenticated" }
  | { state: "unauthenticated" }