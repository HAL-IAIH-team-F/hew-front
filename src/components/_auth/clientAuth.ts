"use client"

import {signInAtServer, signOutAtServer} from "~/_auth/serverAuth";

export async function signIn(path: string = "", provider: string = "keycloak") {
  const redirectUrl = new URL(path, location.href)
  await signInAtServer(redirectUrl.toString(), provider)
}

export async function signOut(path: string = "") {
  "use client"
  const redirectUrl = new URL(path, location.href)
  await signOutAtServer(redirectUrl.toString())
}