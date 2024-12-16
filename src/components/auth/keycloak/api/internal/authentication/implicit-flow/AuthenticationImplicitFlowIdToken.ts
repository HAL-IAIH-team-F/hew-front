import {OidcInternal,} from "~/auth/keycloak/api/internal/OidcInternal";
import {OidcContext} from "../../OidcContext";
import {
  AbstractAuthenticateIdAccessFlowToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AbstractAuthenticateIdAccessFlowToken";
import {Cast} from "../../../../../../../util/assert/Cast";
import validateJwt = OidcInternal.validateJwt;
import checkSigningAlgorithm = OidcInternal.checkSigningAlgorithm;
import getClockSkew = OidcInternal.getClockSkew;
import getClockTolerance = OidcInternal.getClockTolerance;
import Client = OidcInternal.Client;
import validatePresence = OidcInternal.validatePresence;
import validateIssuer = OidcInternal.validateIssuer;
import validateAudience = OidcInternal.validateAudience;
import assertClient = OidcInternal.assertClient;
import jwtClaimNames = OidcInternal.jwtClaimNames;

export class AuthenticationImplicitFlowIdToken extends AbstractAuthenticateIdAccessFlowToken {
  readonly userId: string

  constructor(
    claims: OidcInternal.JWTPayload,
    token: string,
    expireDate: Date,
  ) {
    super(claims, token, expireDate);
    this.userId = Cast.str(claims.sub);
  }

  /**
   * Returns ID Token claims validated during {@link processRefreshTokenResponse} or
   * {@link processDeviceCodeResponse}. To optionally validate its JWS Signature use
   * {@link validateApplicationLevelSignature}
   *
   *   {@link processDeviceCodeResponse}.
   *
   * @returns JWT Claims Set from an ID Token, or undefined if there is no ID Token in `ref`.
   * @param idToken
   * @param context
   * @param expireDate
   */
  static async instance(
    idToken: string, context: OidcContext, expireDate: Date
  ): Promise<AuthenticationImplicitFlowIdToken> {
    const client: Client = context.client;
    assertClient(client)
    const requiredClaims: (keyof typeof jwtClaimNames)[] = ['aud', 'exp', 'iat', 'iss', 'sub']

    const {claims, jwt} = await validateJwt(
      idToken,
      checkSigningAlgorithm.bind(
        undefined,
        context.client.id_token_signed_response_alg,
        context.as.id_token_signing_alg_values_supported,
        'RS256',
      ),
      getClockSkew(client),
      getClockTolerance(client),
      // options?.[jweDecrypt],
      undefined,
    )
      .then(validatePresence.bind(undefined, requiredClaims))
      .then(validateIssuer.bind(undefined, context.as))
      .then(validateAudience.bind(undefined, client.client_id))

    return new AuthenticationImplicitFlowIdToken(claims, jwt, expireDate)
  }
}