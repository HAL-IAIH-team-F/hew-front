import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
import {OidcInternal} from "../../OidcInternal";
import {
  AuthenticationImplicitFlowIdToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowIdToken";
import {Result, Results} from "../../../../../../../util/err/result";
import {ErrorIds} from "../../../../../../../util/err/errorIds";
import {
  AuthenticationImplicitFlowAccessToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AuthenticationImplicitFlowAccessToken";
import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
import assertAs = OidcInternal.assertAs;
import assertClient = OidcInternal.assertClient;
import CodedTypeError = OidcInternal.CodedTypeError;
import ERR_INVALID_ARG_TYPE = OidcInternal.ERR_INVALID_ARG_TYPE;
import getURLSearchParameter = OidcInternal.getURLSearchParameter;
import OPE = OidcInternal.OPE;
import assertString = OidcInternal.assertString;
import brand = OidcInternal.brand;
import Client = OidcInternal.Client;
import expectNoState = OidcInternal.expectNoState;
import skipStateCheck = OidcInternal.skipStateCheck;
import INVALID_RESPONSE = OidcInternal.INVALID_RESPONSE;
import AuthorizationResponseError = OidcInternal.AuthorizationResponseError;
import AuthorizationServer = OidcInternal.AuthorizationServer;

export class AuthenticationImplicitFlowResponse {
  private constructor(
    readonly context: OidcContext,
    readonly params: URLSearchParams,
    private readonly idToken_: string,
    private readonly accessToken_: string,
    private readonly sessionState_: string,
  ) {
  }

  /**
   * Validates an OAuth 2.0 Authorization Response or Authorization Error Response message returned
   * from the authorization server's
   * {@link AuthorizationServer.authorization_endpoint `as.authorization_endpoint`}.
   *
   * @param as Authorization Server Metadata.
   * @param client Client Metadata.
   * @param parameters Authorization response.
   * @param nonce
   * @param expectedState Expected `state` parameter value. Default is {@link expectNoState}.
   *
   * @param context
   * @returns Validated Authorization Response parameters. Authorization Error Responses throw
   *   {@link AuthorizationResponseError}.
   *
   * @group Authorization Code Grant
   * @group Authorization Code Grant w/ OpenID Connect (OIDC)
   *
   * @see [RFC 6749 - The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749.html#section-4.1.2)
   * @see [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)
   * @see [RFC 9207 - OAuth 2.0 Authorization Server Issuer Identification](https://www.rfc-editor.org/rfc/rfc9207.html)
   */
  static async instance(
    context: OidcContext,
    as: AuthorizationServer,
    client: Client,
    parameters: URLSearchParams | URL,
    nonce: Nonce,
    expectedState?: string | typeof expectNoState | typeof skipStateCheck,
  ): Promise<AuthenticationImplicitFlowResponse> {
    assertAs(as)
    assertClient(client)

    if (parameters instanceof URL) {
      parameters = parameters.searchParams
    }

    if (!(parameters instanceof URLSearchParams)) {
      throw CodedTypeError(
        '"parameters" must be an instance of URLSearchParams, or URL',
        ERR_INVALID_ARG_TYPE,
      )
    }

    if (getURLSearchParameter(parameters, 'response')) {
      throw OPE(
        '"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()',
        INVALID_RESPONSE,
        {parameters},
      )
    }

    const iss = getURLSearchParameter(parameters, 'iss')
    const state = getURLSearchParameter(parameters, 'state')

    if (!iss && as.authorization_response_iss_parameter_supported) {
      throw OPE('response parameter "iss" (issuer) missing', INVALID_RESPONSE, {parameters})
    }

    if (iss && iss !== as.issuer) {
      throw OPE('unexpected "iss" (issuer) response parameter value', INVALID_RESPONSE, {
        expected: as.issuer,
        parameters,
      })
    }

    switch (expectedState) {
      case undefined:
      case expectNoState:
        if (state !== undefined) {
          throw OPE('unexpected "state" response parameter encountered', INVALID_RESPONSE, {
            expected: undefined,
            parameters,
          })
        }
        break
      case skipStateCheck:
        break
      default:
        assertString(expectedState, '"expectedState" argument')

        if (state !== expectedState) {
          throw OPE(
            state === undefined
              ? 'response parameter "state" missing'
              : 'unexpected "state" response parameter value',
            INVALID_RESPONSE,
            {expected: expectedState, parameters},
          )
        }
    }

    const error = getURLSearchParameter(parameters, 'error')
    if (error) {
      throw new AuthorizationResponseError('authorization response from the server is an error', {
        cause: parameters,
      })
    }

    const id_token = getURLSearchParameter(parameters, 'id_token')
    if (id_token == undefined) {
      throw OPE('response parameter "id_token" missing', INVALID_RESPONSE, {parameters})
    }
    const accessToken = getURLSearchParameter(parameters, 'access_token')
    if (accessToken == undefined) {
      throw OPE('response parameter "access_token" missing', INVALID_RESPONSE, {parameters})
    }
    // const token = getURLSearchParameter(parameters, 'token')
    // if (id_token !== undefined || token !== undefined) {
    //   throw new UnsupportedOperationError('implicit and hybrid flows are not supported')
    // }
    const params = brand(new URLSearchParams(parameters))

    const sessionState = getURLSearchParameter(params, 'session_state')
    if (sessionState == undefined) {
      throw OPE('response parameter "session_state" missing', INVALID_RESPONSE, {parameters})
    }

    return new AuthenticationImplicitFlowResponse(
      context,
      params,
      id_token,
      accessToken,
      sessionState,
    )
  }

  sessionState() {
    return this.sessionState_;
  }

  async idToken(): Promise<Result<AuthenticationImplicitFlowIdToken>> {
    const expire = this.params.get('expires_in') || "0"
    const expireDate = new Date(Date.now() + parseInt(expire) * 1000)
    return AuthenticationImplicitFlowIdToken.instance(
      this.idToken_,
      this.context,
      expireDate,
    ).then(value => Results.createSuccessResult(value))
      .catch(reason => Results.errResultByReason(reason, ErrorIds.UnknownError));
  }

  async accessToken(): Promise<Result<AuthenticationImplicitFlowAccessToken>> {
    return AuthenticationImplicitFlowAccessToken.instance(
      this.accessToken_,
      this.context,
    ).then(value => Results.createSuccessResult(value))
      .catch(reason => Results.errResultByReason(reason, ErrorIds.UnknownError));
  }
}