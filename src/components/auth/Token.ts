/**
 * トークンを表すインターフェイスです。
 *
 * このインターフェイスは認証やセッション管理で使用されるトークンと
 * その有効期限を格納します。
 *
 * @property {string} token - 認証やセッションで使用されるトークンの文字列。
 * @property {number} expire - トークンが有効である期限を示すタイムスタンプ(ms)。
 */
export interface Token {
  token: string,
  expire: number
}
