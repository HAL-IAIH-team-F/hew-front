export namespace util {
  export function createErrorMessage(reason: any) {
    if (reason instanceof Error && reason.message) {
      return reason.message;
    }
    return reason.toString();
  }
}