"use client"

import {signOutAtServer} from "~/_auth/authAction";

export async function signOut(path: string = "") {
  "use client"
  const redirectUrl = new URL(path, location.href)
  await signOutAtServer(redirectUrl)
}