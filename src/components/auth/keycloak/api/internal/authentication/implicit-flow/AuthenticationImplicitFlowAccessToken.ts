import {OidcInternal,} from "~/auth/keycloak/api/internal/OidcInternal";
import {OidcContext} from "../../OidcContext";
import {
  AbstractAuthenticateIdAccessFlowToken
} from "~/auth/keycloak/api/internal/authentication/implicit-flow/AbstractAuthenticateIdAccessFlowToken";
import validateJwt = OidcInternal.validateJwt;
import checkSigningAlgorithm = OidcInternal.checkSigningAlgorithm;
import getClockSkew = OidcInternal.getClockSkew;
import getClockTolerance = OidcInternal.getClockTolerance;
import Client = OidcInternal.Client;
import validatePresence = OidcInternal.validatePresence;
import validateIssuer = OidcInternal.validateIssuer;
import assertClient = OidcInternal.assertClient;
import jwtClaimNames = OidcInternal.jwtClaimNames;

export class AuthenticationImplicitFlowAccessToken extends AbstractAuthenticateIdAccessFlowToken {

  /**
   * Returns ID Token claims validated during {@link processRefreshTokenResponse} or
   * {@link processDeviceCodeResponse}. To optionally validate its JWS Signature use
   * {@link validateApplicationLevelSignature}
   *
   *   {@link processDeviceCodeResponse}.
   *
   * @returns JWT Claims Set from an ID Token, or undefined if there is no ID Token in `ref`.
   * @param accessToken
   * @param context
   */
  static async instance(accessToken: string, context: OidcContext): Promise<AuthenticationImplicitFlowAccessToken> {
    const client: Client = context.client;
    assertClient(client)
    const requiredClaims: (keyof typeof jwtClaimNames)[] = ['aud', 'exp', 'iat', 'iss', 'sub']

    const {claims, jwt} = await validateJwt(
      accessToken,
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


    if (claims.exp == undefined) throw new Error(
      'ID Token "exp" claim is missing',
    )
    const date = new Date(claims.exp * 1000)

    return new AuthenticationImplicitFlowAccessToken(claims, jwt, date)
  }
}