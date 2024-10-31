import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const ChatRes = z
  .object({ chat_id: z.string().uuid(), users: z.array(z.string().uuid()) })
  .passthrough();
const PostChatBody = z
  .object({ users: z.array(z.string().uuid()) })
  .passthrough();
const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
const name = z.union([z.array(z.string()), z.null()]).optional();
const start_datetime = z.union([z.string(), z.null()]).optional();
const following = z.union([z.boolean(), z.null()]).optional();
const read_limit_number = z
  .union([z.number(), z.null()])
  .optional()
  .default(20);
const OrderDirection = z.enum(["asc", "desc"]);
const time_order = OrderDirection.optional();
const PostTokenBody = z.object({ keycloak_token: z.string() }).passthrough();
const TokenInfo = z
  .object({ token: z.string(), expire: z.string().datetime({ offset: true }) })
  .passthrough();
const TokenRes = z
  .object({ access: TokenInfo, refresh: TokenInfo })
  .passthrough();
const ImgTokenRes = z.object({ upload: TokenInfo }).passthrough();
const PostUserBody = z
  .object({
    user_name: z.string(),
    user_icon_uuid: z.union([z.string(), z.null()]),
  })
  .passthrough();
const Img = z
  .object({
    image_uuid: z.string().uuid(),
    token: z.union([z.string(), z.null()]),
  })
  .passthrough();
const SelfUserRes = z
  .object({
    user_id: z.string().uuid(),
    user_name: z.string(),
    user_screen_id: z.string(),
    user_icon: z.union([Img, z.null()]),
    user_date: z.string().datetime({ offset: true }),
    user_mail: z.string(),
  })
  .passthrough();
const PostCreatorBody = z
  .object({
    user_id: z.string().uuid(),
    contact_address: z.string(),
    transfer_target: z.string(),
  })
  .passthrough();

export const schemas = {
  ChatRes,
  PostChatBody,
  ValidationError,
  HTTPValidationError,
  name,
  start_datetime,
  following,
  read_limit_number,
  OrderDirection,
  time_order,
  PostTokenBody,
  TokenInfo,
  TokenRes,
  ImgTokenRes,
  PostUserBody,
  Img,
  SelfUserRes,
  PostCreatorBody,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api/chat",
    alias: "gc_api_chat_get",
    requestFormat: "json",
    response: z.array(ChatRes),
  },
  {
    method: "post",
    path: "/api/chat",
    alias: "pc_api_chat_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PostChatBody,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/creator",
    alias: "post_creator_api_creator_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PostCreatorBody,
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/api/token",
    alias: "post_token_api_token_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ keycloak_token: z.string() }).passthrough(),
      },
    ],
    response: TokenRes,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/token/image",
    alias: "image_token_api_token_image_get",
    requestFormat: "json",
    response: ImgTokenRes,
  },
  {
    method: "get",
    path: "/api/token/refresh",
    alias: "token_refresh_api_token_refresh_get",
    requestFormat: "json",
    response: TokenRes,
  },
  {
    method: "post",
    path: "/api/user",
    alias: "post_user_api_user_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PostUserBody,
      },
    ],
    response: SelfUserRes,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/api/user/self",
    alias: "get_user_api_user_self_get",
    requestFormat: "json",
    response: SelfUserRes,
  },
  {
    method: "get",
    path: "/health",
    alias: "health_health_get",
    requestFormat: "json",
    response: z.unknown(),
  },
  {
    method: "get",
    path: "/products",
    alias: "read_products_products_get",
    requestFormat: "json",
    parameters: [
      {
        name: "name",
        type: "Query",
        schema: name,
      },
      {
        name: "tag",
        type: "Query",
        schema: name,
      },
      {
        name: "post_by",
        type: "Query",
        schema: name,
      },
      {
        name: "start_datetime",
        type: "Query",
        schema: start_datetime,
      },
      {
        name: "end_datetime",
        type: "Query",
        schema: start_datetime,
      },
      {
        name: "following",
        type: "Query",
        schema: following,
      },
      {
        name: "read_limit_number",
        type: "Query",
        schema: read_limit_number,
      },
      {
        name: "time_order",
        type: "Query",
        schema: time_order,
      },
      {
        name: "name_order",
        type: "Query",
        schema: time_order,
      },
      {
        name: "like_order",
        type: "Query",
        schema: time_order,
      },
      {
        name: "sort",
        type: "Query",
        schema: z.array(z.string()).optional(),
      },
    ],
    response: z.unknown(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
