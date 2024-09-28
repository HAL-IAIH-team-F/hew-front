import {createApiClient} from "@/_api/client";
import {AxiosRequestConfig} from "axios";
import {Session} from "next-auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const apiClient = createApiClient("/", {
  axiosConfig: {baseURL: baseUrl}
});

export function getClientContext(session: Session): ClientContext {
  return new ClientContext(session.access_token, session.refresh_token)
}

export class ClientContext {
  constructor(
    private readonly accessToken: string | undefined,
    private readonly refreshToken: string | undefined,
  ) {
  }

  async exec<T extends AxiosRequestConfig, R>(func: (opt: T) => Promise<R>, opt: T): Promise<R> {
    let authorization = undefined
    if (opt.headers?.Authorization) {
      authorization = opt.headers?.Authorization
    } else if (this.accessToken) {
      authorization = `Bearer ${this.accessToken}`
    }

    return await func({
      headers: {
        Authorization: authorization,
        ...opt.headers,
      },
      ...opt,
    })
  }
}