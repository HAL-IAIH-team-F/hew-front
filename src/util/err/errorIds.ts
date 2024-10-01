import {ErrorData} from "./err";

export class ErrorIds {
  static readonly ACCESS_TOKEN_EXPIRED = createErrorId("ACCESS_TOKEN_EXPIRED");
  static readonly USER_NOT_FOUND = createErrorId("USER_NOT_FOUND");
  static readonly NoLogin = createErrorId("NoLogin");
  static readonly InvalidLoginState = createErrorId("InvalidLoginState");
  static readonly NoId = createErrorId("NoId");
  static readonly UnknownError = createErrorId("Unknown");
  static readonly NotImplement = createErrorId("NotImplement");
  static readonly ApiError = createErrorId("ApiError");
  static readonly InvalidKeycloakToken = createErrorId("InvalidKeycloakToken");
  static readonly RefreshTokenError = createErrorId("RefreshTokenError");
  static readonly KeycloakRefreshError = createErrorId("KeycloakRefreshError");
  static readonly KeycloakRefreshResponseError = createErrorId("KeycloakRefreshResponseError");
  static readonly InvalidBody = createErrorId("InvalidBody");

  static createData(errorId: ErrId, msg: string): ErrorData {
    return {error_id: errorId.name, message: msg};
  }
}

export interface ErrId {
  name: string;

  createData(msg: string): ErrorData;

  equals(errId: string | undefined): boolean
}

function createErrorId(name: string): ErrId {
  return {
    name: name,
    createData(msg: string): ErrorData {
      return {error_id: name, message: msg};
    },
    equals(errId: string | undefined): boolean {
      return errId == name
    }
  };
}
