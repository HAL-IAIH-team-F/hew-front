import {createApiClient} from "~/api/client";
import {createApiClient as createImgApiClient} from "~/api/imgClient";
import {Results} from "../../../util/err/result";
import {ErrorIds} from "../../../util/err/errorIds";
import {Env} from "~/env";
import createSuccessResult = Results.createSuccessResult;

export const imgApiClient = createImgApiClient(Env.imgBaseUrl, {});


export const apiClient = createApiClient(Env.baseUrl, {});

export class Img {
  constructor(
    readonly image_uuid: string,
    readonly token: string | null,
    readonly preference: { filename: string },
  ) {
  }

  static async create(uuid: string, token: string | null) {
    const preference = await imgApiClient.img_preference_preference__image_uuid__get({params: {image_uuid: uuid}})
      .then(value => Results.createSuccessResult(value))
      .catch(reason => {
        return Results.errResultByReason(reason, ErrorIds.ApiError)
      })
    if (preference.error) return preference
    return createSuccessResult(new Img(uuid, token, preference.success));
  }

  url() {
    const url = new URL(`/img/${this.image_uuid}/${this.preference.filename}`, Env.imgBaseUrl)
    if (this.token) {
      url.searchParams.set("q", this.token)
    }
    return url
  }

  strUrl() {
    return this.url().toString()
  }
}

