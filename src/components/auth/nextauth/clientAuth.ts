"use client"

import {signOutAtServer} from "~/auth/nextauth/server";

export async function signIn() {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  open('/auth/login', 'Login', `width=500,height=600, left=${x},top=${y}`);
}

export async function signOut(path: string = "") {
  "use client"
  const redirectUrl = new URL(path, location.href)
  await signOutAtServer(redirectUrl.toString())
}