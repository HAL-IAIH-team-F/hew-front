"use server"
import {nextAuth} from "~/auth/nextauth/auth";

export default async function noPromptUrl(url: string): Promise<string> {
  return await nextAuth.signIn("keycloak", {redirect: false, redirectTo: url}, {
    prompt: "none",
    redirect_uri: url
  })
}