"use server"
import {Session} from "next-auth";
import {apiClient, ClientContext} from "@/_api/wrapper";

export async function refreshClient(accessToken: string) {
  return await apiClient.post_token_api_token_post({keycloak_token: accessToken})
}