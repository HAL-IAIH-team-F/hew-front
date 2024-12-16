export class Nonce {
  readonly nonce: string

  constructor(win: Window) {
    const ary = win.crypto.getRandomValues(new Int32Array(1))
    this.nonce = ary[0].toString(36)
  }
}