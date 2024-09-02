import {ErrorData} from "./result";

export class ErrorIds {
  static readonly ACCESS_TOKEN_EXPIRED = createErrorId("ACCESS_TOKEN_EXPIRED");
  static readonly NoLogin = createErrorId("NoLogin");
  static readonly NoId = createErrorId("NoId");
  static readonly UnknownError = createErrorId("Unknown");
  static readonly InvalidNumber = createErrorId("InvalidNumber");
  static readonly InvalidBody = createErrorId("InvalidBody");

  static createData(errorId: ErrorId, msg: string): ErrorData {
    return {error_id: errorId.name, message: msg};
  }

}

function createErrorId(name: string): ErrorId {
  return {
    name: name,
    createData(msg: string): ErrorData {
      return {error_id: name, message: msg};
    },
  };
}

export interface ErrorId {
  name: string;

  createData(msg: string): ErrorData;
}
