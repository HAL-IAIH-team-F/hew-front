import {Assert} from "./Assert";

export namespace Cast {
  export function str(v: any) {
    Assert.str(v)
    return v
  }
}