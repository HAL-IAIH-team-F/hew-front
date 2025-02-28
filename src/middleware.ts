import { NextRequest, NextResponse } from 'next/server'
import {Env} from "~/env";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self' ${Env.keycloak.baseUrl} ${Env.baseUrl} ${Env.imgBaseUrl};
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${Env.imgBaseUrl};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' ${Env.keycloak.baseUrl};
    frame-ancestors 'self';
    upgrade-insecure-requests;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s{2,}/g, ' ')
      .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  requestHeaders.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue
  )

  return response
}