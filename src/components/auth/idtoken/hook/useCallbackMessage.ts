// import {OidcContext} from "~/auth/keycloak/api/internal/OidcContext";
// import {Nonce} from "~/auth/keycloak/api/internal/Nonce";
// import handleCallbackEvent from "@/auth/callback/[mode]/handleCallbackEvent";
// import {IdTokenState} from "~/auth/idtoken/IdTokenState";
// import useMessageEvent from "~/auth/idtoken/hook/useMessageEvent";
//
// export default function useCallbackMessage(
//   oidc: OidcContext | undefined, nonce: Nonce | undefined, current: HTMLIFrameElement | null,
//   update: (token: IdTokenState) => void, onFinish: () => void,
// ) {
//   useMessageEvent(evt => {
//     if (evt.origin != location.origin) return;
//     if (nonce == undefined) return;
//     handleCallbackEvent(evt, data => {
//       current?.contentWindow?.postMessage(data, location.origin)
//     }, oidc, nonce, update, onFinish)
//   }, [oidc, nonce])
//
// }
