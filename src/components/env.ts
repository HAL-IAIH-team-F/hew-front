export namespace Env {
  export namespace keycloak {
    export const realms = process.env.NEXT_PUBLIC_KEYCLOAK_REALMS
    export const baseUrl = str(process.env.NEXT_PUBLIC_KEYCLOAK_BASEURL)
    export const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_ID as string
    export const clientSecret = process.env.KEYCLOAK_SECRET as string
  }
  export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
  export const imgBaseUrl = process.env.NEXT_PUBLIC_IMG_BASE_URL as string;
  export const debug = process.env.NEXT_PUBLIC_DEBUG == "true";
}

function str(s: string | undefined): string {
  if (s == undefined) throw new Error("undefined")
  return s
}