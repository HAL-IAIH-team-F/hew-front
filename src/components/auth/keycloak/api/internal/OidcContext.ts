
import {Env} from "~/env";
import {OidcInternal} from "~/auth/keycloak/api/internal/OidcInternal";
import {
  AuthenticationImplicitFlowResponse
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowResponse";
import {Result, Results} from "../../../../../util/err/result";
import {ErrorIds} from "../../../../../util/err/errorIds";
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import AuthorizationServer = OidcInternal.AuthorizationServer;
import None = OidcInternal.None;
import allowInsecureRequests = OidcInternal.allowInsecureRequests;
import discoveryRequest = OidcInternal.discoveryRequest;
import processDiscoveryResponse = OidcInternal.processDiscoveryResponse;
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";

export class OidcContext {
  readonly clientAuth = None()
  readonly client: OidcInternal.Client

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
    return await discoveryRequest(KeycloakConfig.issuerUrl, {algorithm: "oidc", [allowInsecureRequests]: Env.debug})
      .then(response => processDiscoveryResponse(KeycloakConfig.issuerUrl, response))
  }

  async authenticationImplicitFlowResponse(
    params: URLSearchParams, nonce: Nonce
  ): Promise<Result<AuthenticationImplicitFlowResponse>> {
    return AuthenticationImplicitFlowResponse.instance(this, this.as, this.client, params, nonce)
      .then(value => Results.createSuccessResult(value))
      .catch(reason => Results.errResultByReason(reason, ErrorIds.AuthImplicitFlowResError))
  }
}