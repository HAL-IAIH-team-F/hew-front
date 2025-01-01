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
const PostChatMessageBody = z
  .object({ message: z.string(), images: z.array(z.string().uuid()) })
  .passthrough();
const ChatMessageRes = z
  .object({
    chat_id: z.string().uuid(),
    chat_message_id: z.string().uuid(),
    index: z.number().int(),
    message: z.string(),
    images: z.array(z.string().uuid()),
  })
  .passthrough();
const MessageRes = z
  .object({
    chat_message_id: z.string().uuid(),
    index: z.number().int(),
    message: z.string(),
    images: z.array(z.string().uuid()),
    post_user_id: z.string().uuid(),
  })
  .passthrough();
const ChatMessagesRes = z
  .object({ chat_id: z.string().uuid(), messages: z.array(MessageRes) })
  .passthrough();
const PostColabRequestBody = z
  .object({ recruit_id: z.string().uuid() })
  .passthrough();
const PostCollaboBody = z
  .object({
    title: z.string(),
    description: z.string(),
    creators: z.array(z.string().uuid()),
  })
  .passthrough();
const PostColabApproveBody = z
  .object({ colab_id: z.string().uuid() })
  .passthrough();
const CreatorResponse = z
  .object({
    creator_id: z.string().uuid(),
    user_id: z.string().uuid(),
    contact_address: z.string(),
  })
  .passthrough();
const PostCreatorBody = z
  .object({ contact_address: z.string(), transfer_target: z.string() })
  .passthrough();
const UserFollow = z.object({ creator_id: z.string().uuid() }).passthrough();
const NotificationType = z.enum(["colab_request", "colab_approve", "colab"]);
const ColabNotificationData = z
  .object({
    notification_type: NotificationType,
    collabo_id: z.string().uuid(),
    owner_id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    creator_ids: z.array(z.string().uuid()),
  })
  .passthrough();
const ColabRequestNotificationData = z
  .object({
    notification_type: NotificationType,
    colab_request_id: z.string().uuid(),
    from_creator_id: z.string().uuid(),
  })
  .passthrough();
const ColabApproveNotificationData = z
  .object({
    notification_type: NotificationType,
    collabo_id: z.string().uuid(),
    collabo_approve_id: z.string().uuid(),
    colab_creator_id: z.string(),
  })
  .passthrough();
const NotificationData = z.union([
  ColabNotificationData,
  ColabRequestNotificationData,
  ColabApproveNotificationData,
]);
const NotificationRes = z
  .object({ notification_id: z.string().uuid(), data: NotificationData })
  .passthrough();
const CartRes = z
  .object({
    product_id: z.string().uuid(),
    product_price: z.number().int(),
    product_title: z.string(),
    product_description: z.string(),
    purchase_date: z.string().datetime({ offset: true }),
    product_contents_uuid: z.string().uuid(),
    product_thumbnail_uuid: z.string().uuid(),
  })
  .passthrough();
const PostProductBody = z
  .object({
    price: z.number().int(),
    product_title: z.string(),
    product_description: z.string(),
    purchase_date: z.string().datetime({ offset: true }),
    product_thumbnail_uuid: z.string().uuid(),
    product_contents_uuid: z.string().uuid(),
  })
  .passthrough();
const ProductRes = z
  .object({
    product_id: z.string().uuid(),
    product_price: z.number().int(),
    product_title: z.string(),
    product_description: z.string(),
    listing_date: z.string().datetime({ offset: true }),
    product_thumbnail_uuid: z.string().uuid(),
    product_contents_uuid: z.string().uuid(),
    creator_id: z.string().uuid(),
  })
  .passthrough();
const name = z.union([z.array(z.string()), z.null()]).optional();
const start_datetime = z.union([z.string(), z.null()]).optional();
const following = z.union([z.boolean(), z.null()]).optional();
const limit = z.union([z.number(), z.null()]).optional().default(20);
const OrderDirection = z.enum(["asc", "desc"]);
const time_order = OrderDirection.optional();
const GetProductsResponse = z
  .object({
    product_description: z.string(),
    product_id: z.string().uuid(),
    product_thumbnail_uuid: z.string().uuid(),
    product_price: z.number().int(),
    product_title: z.string(),
    purchase_date: z.string().datetime({ offset: true }),
    product_contents_uuid: z.string().uuid(),
    creator_ids: z.array(z.string().uuid()),
  })
  .passthrough();
const RecruitRes = z
  .object({
    recruit_id: z.string().uuid(),
    creator_id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
  })
  .passthrough();
const PostRecruitBody = z
  .object({ title: z.string(), description: z.string() })
  .passthrough();
const TokenInfo = z
  .object({ token: z.string(), expire: z.string().datetime({ offset: true }) })
  .passthrough();
const TokenRes = z
  .object({ access: TokenInfo, refresh: TokenInfo })
  .passthrough();
const PostTokenBody = z.object({ keycloak_token: z.string() }).passthrough();
const TokenInfoOld = z
  .object({ token: z.string(), expire: z.string().datetime({ offset: true }) })
  .passthrough();
const TokenResOld = z
  .object({ access: TokenInfoOld, refresh: TokenInfoOld })
  .passthrough();
const ImgTokenRes = z.object({ upload: TokenInfoOld }).passthrough();
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

export const schemas = {
  ChatRes,
  PostChatBody,
  ValidationError,
  HTTPValidationError,
  PostChatMessageBody,
  ChatMessageRes,
  MessageRes,
  ChatMessagesRes,
  PostColabRequestBody,
  PostCollaboBody,
  PostColabApproveBody,
  CreatorResponse,
  PostCreatorBody,
  UserFollow,
  NotificationType,
  ColabNotificationData,
  ColabRequestNotificationData,
  ColabApproveNotificationData,
  NotificationData,
  NotificationRes,
  CartRes,
  PostProductBody,
  ProductRes,
  name,
  start_datetime,
  following,
  limit,
  OrderDirection,
  time_order,
  GetProductsResponse,
  RecruitRes,
  PostRecruitBody,
  TokenInfo,
  TokenRes,
  PostTokenBody,
  TokenInfoOld,
  TokenResOld,
  ImgTokenRes,
  PostUserBody,
  Img,
  SelfUserRes,
};

const endpoints = makeApi([
  {
    method: "put",
    path: "/api/cart_buy",
    alias: "cart_buy_api_cart_buy_put",
    requestFormat: "json",
    response: z.unknown(),
  },
  {
    method: "get",
    path: "/api/chat",
    alias: "gcs_api_chat_get",
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
    response: ChatRes,
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
    path: "/api/chat/:chat_id/message",
    alias: "pcm_api_chat__chat_id__message_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PostChatMessageBody,
      },
      {
        name: "chat_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: ChatMessageRes,
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
    path: "/api/chat/:chat_id/message",
    alias: "gcms_api_chat__chat_id__message_get",
    requestFormat: "json",
    parameters: [
      {
        name: "chat_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: ChatMessagesRes,
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
    path: "/api/colab",
    alias: "pc_api_colab_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PostCollaboBody,
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
    path: "/api/colab/approve",
    alias: "pca_api_colab_approve_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ colab_id: z.string().uuid() }).passthrough(),
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
    path: "/api/colab/request",
    alias: "pcr_api_colab_request_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ recruit_id: z.string().uuid() }).passthrough(),
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
    method: "get",
    path: "/api/creator",
    alias: "gcs_api_creator_get",
    requestFormat: "json",
    response: z.array(CreatorResponse),
  },
  {
    method: "post",
    path: "/api/creator",
    alias: "pc_api_creator_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PostCreatorBody,
      },
    ],
    response: CreatorResponse,
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
    path: "/api/notification",
    alias: "gns_api_notification_get",
    requestFormat: "json",
    response: z.array(NotificationRes),
  },
  {
    method: "post",
    path: "/api/product",
    alias: "pp_api_product_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PostProductBody,
      },
    ],
    response: ProductRes,
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
    path: "/api/product",
    alias: "gps_api_product_get",
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
        name: "limit",
        type: "Query",
        schema: limit,
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
    response: z.array(GetProductsResponse),
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
    path: "/api/product_cart",
    alias: "read_product_cart_api_product_cart_get",
    requestFormat: "json",
    response: z.array(CartRes),
  },
  {
    method: "get",
    path: "/api/recruit",
    alias: "grs_api_recruit_get",
    requestFormat: "json",
    parameters: [
      {
        name: "limit",
        type: "Query",
        schema: limit,
      },
      {
        name: "name",
        type: "Query",
        schema: name,
      },
    ],
    response: z.array(RecruitRes),
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
    path: "/api/recruit",
    alias: "pr_api_recruit_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PostRecruitBody,
      },
    ],
    response: RecruitRes,
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
    path: "/api/token",
    alias: "gtr_api_token_get",
    requestFormat: "json",
    response: TokenRes,
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
    response: TokenResOld,
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
    response: TokenResOld,
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
    method: "post",
    path: "/api/user_follow",
    alias: "cfc_api_user_follow_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ creator_id: z.string().uuid() }).passthrough(),
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
    response: z.object({}).partial().passthrough(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
