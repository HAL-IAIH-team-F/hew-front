// noinspection JSUnusedGlobalSymbols

import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Body_upload_image_upload__post = z
  .object({ file: z.instanceof(File) })
  .passthrough();
const TokenRes = z.object({ image_uuid: z.string().uuid() }).passthrough();
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
const State = z.enum(["Public", "Private"]);
const ImgPreferenceBody = z.object({ state: State }).passthrough();
const ImgPreferenceRes = z.object({ filename: z.string() }).passthrough();
const filename = z.union([z.string(), z.null()]);
const q = z.union([z.string(), z.null()]).optional();

export const schemas = {
  Body_upload_image_upload__post,
  TokenRes,
  ValidationError,
  HTTPValidationError,
  State,
  ImgPreferenceBody,
  ImgPreferenceRes,
  filename,
  q,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/img/:image_uuid/:filename",
    alias: "get_image_img__image_uuid___filename__get",
    requestFormat: "json",
    parameters: [
      {
        name: "image_uuid",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "filename",
        type: "Path",
        schema: filename,
      },
      {
        name: "q",
        type: "Query",
        schema: q,
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
    method: "put",
    path: "/preference/:image_uuid",
    alias: "img_preference_preference__image_uuid__put",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ImgPreferenceBody,
      },
      {
        name: "image_uuid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.object({ filename: z.string() }).passthrough(),
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
    path: "/preference/:image_uuid",
    alias: "img_preference_preference__image_uuid__get",
    requestFormat: "json",
    parameters: [
      {
        name: "image_uuid",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.object({ filename: z.string() }).passthrough(),
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
    path: "/upload/",
    alias: "upload_image_upload__post",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ file: z.instanceof(File) }).passthrough(),
      },
    ],
    response: z.object({ image_uuid: z.string().uuid() }).passthrough(),
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
