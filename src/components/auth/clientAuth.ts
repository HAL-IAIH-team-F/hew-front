"use client"

import {signOutAtServer} from "~/auth/serverAuth";

export async function signIn() {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  open('/login', 'Login', `width=500,height=600, left=${x},top=${y}`);
}

export async function signOut(path: string = "") {
  "use client"
  const redirectUrl = new URL(path, location.href)
  await signOutAtServer(redirectUrl.toString())
}