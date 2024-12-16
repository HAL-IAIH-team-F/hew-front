// import {TokenBundle, TokenBundleUtil} from "~/auth/nextauth/TokenBundle";
// import {Session} from "next-auth";
// import {Result, Results} from "../../../util/err/result";
// import {add, isAfter, parseISO} from "date-fns";
// import {Api} from "~/api/context/Api";
// import {ErrorIds} from "../../../util/err/errorIds";
// import {reSignIn} from "~/api/context/server";

// export async function refreshToken(current: TokenBundle, session: Session): Promise<Result<TokenBundle>> {
//   const refresh = current?.refresh
//   if (!refresh) {
//     return refreshByKeycloak(session.keycloakTokenBundle)
//   }
//
//   const expire = add(new Date(refresh.expire), {minutes: -1})
//   if (isAfter(expire, Date.now())) {
//     return refreshByKeycloak(session.keycloakTokenBundle)
//   }
//   return refreshByRefreshToken(refresh.token)
// }

// async function refreshByRefreshToken(token: string): Promise<Result<TokenBundle>> {
//   return await Api.app.gtr_api_token_get({
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }).then(value => {
//     return createTokenBundle(value)
//   }).catch(reason => {
//     return Results.errResultByReason(reason, ErrorIds.ApiError)
//   })
// }

// export async function refreshByKeycloak(keycloakToken: TokenBundle | undefined): Promise<Result<TokenBundle>> {
//   const token = await keycloakAccessToken(keycloakToken)
//   if (token.error) return token
//   if (!token) return Results.errResultByReason("keycloak token is undefined", ErrorIds.NoLogin)
//
//   return await Api.app.post_token_api_token_post({keycloak_token: token.success}).then(value => {
//     return createTokenBundle(value)
//   }).catch(reason => {
//     return Results.errResultByReason(reason, ErrorIds.RefreshTokenError)
//   })
// }

// async function keycloakAccessToken(keycloakToken: TokenBundle | undefined): Promise<Result<string>> {
//   const access = keycloakToken?.access
//   const expire = access?.expire || 0
//   if (access?.token && Date.now() < add(new Date(expire), {minutes: -1}).getTime())
//     return Results.createSuccessResult(access.token)
//   await reSignIn()
//   return Results.errResultByReason("failed to sign out", ErrorIds.KeycloakRefreshError)
// }

// export function createTokenBundle(value: any) {
//   return Results.createSuccessResult(TokenBundleUtil.create(
//     {token: value.access.token, expire: parseISO(value.access.expire).getTime()},
//     {token: value.refresh.token, expire: parseISO(value.refresh.expire).getTime()},
//   ))
// }