import {Token} from "~/auth/Token";

export interface TokenBundle {
  access: Token | undefined
  refresh: Token | undefined
}

export namespace TokenBundleUtil {
  export function create(access: Token | undefined, refresh: Token | undefined): TokenBundle {
    return {access, refresh}
  }
}