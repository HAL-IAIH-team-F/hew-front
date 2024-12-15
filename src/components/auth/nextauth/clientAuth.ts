"use client"

import handleCallbackEvent from "@/auth/callback/[mode]/handleCallbackEvent";
import {
  AuthenticationImplicitFlowUrl
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowUrl";
import {Nonce} from "../keycloak/api/internal/Nonce";
import {ClientContextState} from "~/api/context/ClientContextProvider";

export async function signIn(clientContext: ClientContextState) {
  if (clientContext.state == "loading") throw new Error("Loading")
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  const url = new AuthenticationImplicitFlowUrl(new Nonce(window), "login", "popup")
  const win = open(url.url(), 'Login', `width=500,height=600, left=${x},top=${y}`);
  // const win = open('/auth/login', 'Login', `width=500,height=600, left=${x},top=${y}`);
  if (win == null) throw new Error("Failed to open window")

  window.addEventListener("message", (evt) => {
    console.debug(evt.data)
    if (evt.origin !== location.origin) return;
    handleCallbackEvent(evt, data => {
      win.postMessage(data, location.origin)
    }, clientContext.oidcContext, url.nonce, clientContext.setIdToken, () => {
      console.debug("finish")
      win.close()
    })
  })

}

export async function signOut(clientContext: ClientContextState) {
  "use client"
  // const redirectUrl = new URL(path, location.href)
  // await signOutAtServer(redirectUrl.toString())
  if (clientContext.state == "loading") throw new Error("Loading")
  clientContext.setIdToken({state: "unauthenticated", oidcContext: clientContext.oidcContext})
}