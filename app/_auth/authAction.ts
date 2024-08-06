"use server"
import type {BuiltInProviderType} from "@auth/core/providers";
import {auth, keycloakConfig, nextAuth} from "@/app/_auth/auth";
import {redirect} from "next/navigation";

export async function signIn<
  P extends BuiltInProviderType | (string & {})
>(provider?: P) {
  return await nextAuth.signIn<P>(provider)
}

export async function signOutAtServer(url: URL) {
  "use server"
  const session = await auth()
  const formData = new FormData()
  formData.append("client_id", keycloakConfig.clientId)
  formData.append("client_secret", keycloakConfig.clientSecret)
  formData.append("refresh_token", session?.refresh_token || "")
  await nextAuth.signOut({redirect: false})

  const searchParams = new URLSearchParams()
  searchParams.append("post_logout_redirect_uri", url.toString())
  searchParams.append("id_token_hint", session?.id_token || "")
  redirect(new URL(
    `/realms/${keycloakConfig.realms}/protocol/openid-connect/logout?${searchParams.toString()}`,
    keycloakConfig.baseUrl
  ).toString())
}
