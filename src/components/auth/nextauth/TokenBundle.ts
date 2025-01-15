import {Token} from "~/auth/nextauth/Token";

export interface TokenBundle {
  access: Token
  refresh: Token
}

export namespace TokenBundleUtil {
  export function create(access: Token, refresh: Token): TokenBundle {
    return {access, refresh}
  }
}