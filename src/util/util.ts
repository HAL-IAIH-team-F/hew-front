export namespace util {
  export function createErrorMessage(reason: any) {
    if (reason instanceof Error && reason.message) {
      return reason.message;
    }
    return reason.toString();
  }
}

export function sx(...classNames: (string | undefined)[]): string {
  return classNames
    .filter(value => value)
    .map(value => value?.trim())
    .join(" ")
}