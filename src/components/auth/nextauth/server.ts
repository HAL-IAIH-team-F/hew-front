"use server"
import type {BuiltInProviderType} from "@auth/core/providers";
import {redirect} from "next/navigation";
import {auth, nextAuth} from "~/auth/nextauth/auth";
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";

export async function signInAtServer<
  P extends BuiltInProviderType | (string & {})
>(url: string, provider: P) {
  return await nextAuth.signIn<P>(provider, {redirectTo: url})
}

export async function signInAtServerCurrentPage<
  P extends BuiltInProviderType | (string & {})
>(provider: P) {
  return await nextAuth.signIn<P>(provider)
}

export async function signOutAtServer(url: string) {
  "use server"
  const session = await auth()
  if (session == undefined) return
  await nextAuth.signOut({redirect: false})

  const searchParams = new URLSearchParams()
  searchParams.append("post_logout_redirect_uri", url)
  searchParams.append("id_token_hint", session.keycloak_id_token || "")
  redirect(new URL(
    `/realms/${KeycloakConfig.realms}/protocol/openid-connect/logout?${searchParams.toString()}`,
    KeycloakConfig.baseUrl
  ).toString())
}
