import {ErrorRes} from "./errorRes";


export interface ErrorData {
  error_id: string;
  message: string;
}

export namespace Err {
  export function createErrorData(errorRes: ErrorRes): ErrorData {
    return {error_id: errorRes.error_id, message: errorRes.message}
  }
}