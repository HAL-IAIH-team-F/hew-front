import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext"
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import {Result, Results} from "../../../../util/err/result";
import {
  AuthenticationImplicitFlowIdToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowIdToken";
import {ErrorIds} from "../../../../util/err/errorIds";
import {IdTokenState} from "~/auth/idtoken/IdTokenState";

export default function handleCallbackEvent(
  evt: MessageEvent, postMessage: (data: {
    type: "callback_request";
  }) => void, oidc: OidcContext | undefined, nonce: Nonce, update: (token: IdTokenState) => void, onFinish: () => void) {
  switch (evt.data.type) {
    case "callback_ready":
      postMessage({type: "callback_request"})
      break
    case "callback_result":
      if (oidc) validateCallbackResult(evt.data.param, oidc, nonce, update)
        .then(value => {
          if (value.error) return console.error(value.error)
        })
      onFinish()
      break
  }
}

async function validateCallbackResult(
  param: string, context: OidcContext, nonce: Nonce,
  update: (token: IdTokenState) => void
): Promise<Result<AuthenticationImplicitFlowIdToken | undefined>> {
  const params = new URLSearchParams(param)
  const error = params.get("error")
  if (error == "login_required") {
    update({state: "unauthenticated", oidcContext: context})
    return Results.createSuccessResult(undefined)
  }
  if (error) {
    console.error(error)
    return Results.errResultByReason(error, ErrorIds.UnknownError);
  }
  const response = await context.authenticationImplicitFlowResponse(params, nonce)
  if (response.error) return response
  const idToken = await response.success.idToken()
  if (idToken.error) return idToken
  const accessToken = await response.success.accessToken()
  if (accessToken.error) return accessToken
  update({
    state: "authenticated",
    idToken: idToken.success,
    accessToken: accessToken.success,
    sessionState: response.success.sessionState(),
    oidcContext: context,
  })
  return Results.createSuccessResult(undefined)
}