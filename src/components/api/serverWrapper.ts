"use server"

import {nextAuth} from "~/auth/auth";


export async function reSignIn() {
  await nextAuth.signIn("keycloak")
}