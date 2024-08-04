"use server"
import type {BuiltInProviderType} from "@auth/core/providers";
import {auth, keycloakConfig, nextAuth} from "@/app/_auth/auth";

export async function signIn<
  P extends BuiltInProviderType | (string & {})
>(provider?: P) {
  return await nextAuth.signIn<P>(provider)
}

export async function signOut() {
  "use server"
  const session = await auth()
  const formData = new FormData()
  formData.append("client_id", keycloakConfig.clientId)
  formData.append("client_secret", keycloakConfig.clientSecret)
  formData.append("refresh_token", session?.refresh_token || "")
  const request = new Request(new URL(
    `/realms/${keycloakConfig.realms}/protocol/openid-connect/logout/backchannel-logout`,
    keycloakConfig.baseUrl
  ), {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
    mode: "cors"
  })
  console.debug(request)
  await fetch(request).then(value => {
    if (value.ok) return
    console.error(value)
    value.text().then(value1 => {
      console.error(value1)
    })
  }).catch(reason => console.error(reason))
  await nextAuth.signOut({redirect: false})
}
