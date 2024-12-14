import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import useMessageEvent from "~/auth/keycloak/hook/useMessageEvent";
import {signOut} from "~/auth/nextauth/clientAuth";
import {Result, Results} from "../../../../util/err/result";
import {ErrorIds} from "../../../../util/err/errorIds";
import {
  AuthenticationImplicitFlowIdToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowIdToken";
import {SessionContextValue, useSession} from "next-auth/react";
import {MutableRefObject} from "react";

export default function useCallbackMessage(
  oidc: OidcContext | undefined, nonce: string, current: HTMLIFrameElement | null,
  update: (token: (AuthenticationImplicitFlowIdToken | undefined)) => void
  , executing: MutableRefObject<boolean>) {
  const session = useSession()
  useMessageEvent(evt => {
    if (evt.origin != location.origin) return;

    switch (evt.data.type) {
      case "callback_ready":
        current?.contentWindow?.postMessage({type: "callback_request"}, location.origin)
        break
      case "callback_result":
        if (oidc) validateCallbackResult(evt.data.param, oidc, nonce, session, update)
          .then(value => {
            if (value.error) return console.error(value.error)
          })
        executing.current = false
        break
    }
  }, [oidc, nonce])

}

async function validateCallbackResult(
  param: string, context: OidcContext, nonce: string,
  session: SessionContextValue, update: (token: AuthenticationImplicitFlowIdToken | undefined) => void
): Promise<Result<AuthenticationImplicitFlowIdToken | undefined>> {
  const params = new URLSearchParams(param)
  const error = params.get("error")
  if (error == "login_required") {
    if (session.status == "authenticated") signOut().catch(reason => console.error(reason))
    update(undefined)
    return Results.createSuccessResult(undefined)
  }
  if (error) {
    console.error(error)
    return Results.errResultByReason(error, ErrorIds.UnknownError);
  }
  const result = await context.authenticationImplicitFlowResponse(params, nonce)
  if (result.error) return result
  const token = await result.success.idToken()
  if (token.error) return token
  update(token.success)
  return Results.createSuccessResult(undefined)
}