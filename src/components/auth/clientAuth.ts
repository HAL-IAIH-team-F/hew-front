"use client"

import {
  AuthenticationImplicitFlowUrl
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowUrl";

import {IdTokenUtl} from "~/auth/idtoken/IdTokenUtl";
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import {ClientState} from "~/api/context/ClientState";

export async function signIn(clientContext: ClientState, onClose: (() => void) | undefined = undefined) {
  if (clientContext.state == "loading") throw new Error("Loading")
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  const url = new AuthenticationImplicitFlowUrl(new Nonce(window), "login", "popup")
  const win = open(url.url(), 'Login', `width=500,height=600, left=${x},top=${y}`);
  if (win == null) throw new Error("Failed to open window")
  win.addEventListener("close", onClose || (() => {
  }))
  IdTokenUtl.receiveMessage(win, url, () => {
    win.close()
  }, clientContext.oidcContext, clientContext.setIdToken)
}

export async function signOut(clientContext: ClientState) {
  "use client"
  if (clientContext.state == "loading") throw new Error("Loading")
  if (clientContext.state == "unauthenticated") throw new Error("Unauthenticated")
   
  clientContext.signOut()
}
