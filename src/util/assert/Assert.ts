export namespace Assert {
  export function str(v: any): asserts v is string {
    if (typeof v !== "string") throw new Error("not string")
  }
}