import * as oauth from "oauth4webapi";
import {allowInsecureRequests} from "oauth4webapi";
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";
import {Env} from "~/env";
import {OidcInternal} from "~/auth/keycloak/api/internal/OidcInternal";
import {
  AuthenticationImplicitFlowResponse
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowResponse";
import {Result, Results} from "../../../../../util/err/result";
import {ErrorIds} from "../../../../../util/err/errorIds";
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import AuthorizationServer = OidcInternal.AuthorizationServer;

export class OidcContext {
  readonly clientAuth = oauth.None()
  readonly client: oauth.Client

  private constructor(
    clientId: string,
    readonly as: AuthorizationServer,
    readonly callbackUrl: URL,
  ) {
    this.client = {client_id: clientId}
  }

  public static async instance(clientId: string, callbackUrl: URL,) {
    return new OidcContext(clientId, await OidcContext.authorizationServer(), callbackUrl)
  }

  private static async authorizationServer() {
    // noinspection JSDeprecatedSymbols
    return await oauth
      .discoveryRequest(KeycloakConfig.issuerUrl, {algorithm: "oidc", [allowInsecureRequests]: Env.debug})
      .then(response => oauth.processDiscoveryResponse(KeycloakConfig.issuerUrl, response))
  }

  async authenticationImplicitFlowResponse(
    params: URLSearchParams, nonce: Nonce
  ): Promise<Result<AuthenticationImplicitFlowResponse>> {
    return AuthenticationImplicitFlowResponse.instance(this, this.as, this.client, params, nonce)
      .then(value => Results.createSuccessResult(value))
      .catch(reason => Results.errResultByReason(reason, ErrorIds.UnknownError))
  }
}