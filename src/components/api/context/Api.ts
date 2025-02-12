import {Results} from "../../../util/err/result";
import {ErrorIds} from "../../../util/err/errorIds";
import {Env} from "~/env";
import {createApiClient} from "~/api/client";
import {createApiClient as createImgApi} from "~/api/imgClient";
import createSuccessResult = Results.createSuccessResult;

export namespace Api {
    export const app = createApiClient(Env.baseUrl, {});
    export const img = createImgApi(Env.imgBaseUrl, {});
}

export class Img {
    constructor(
        readonly image_uuid: string,
        readonly token: string | null,
        readonly preference: { filename: string },
    ) {
    }

    static async create(uuid: string, token: string | null) {
        const preference = await Api.img.img_preference_preference__image_uuid__get({params: {image_uuid: uuid}})
            .then(value => Results.createSuccessResult(value))
            .catch(reason => {
                return Results.errResultByReason(reason, ErrorIds.ApiError)
            })
        if (preference.error) return preference
        return createSuccessResult(new Img(uuid, token, preference.success));
    }

    url(download = false) {
        const url = new URL(`/img/${this.image_uuid}/${this.preference.filename}`, Env.imgBaseUrl)
        if (this.token) {
            url.searchParams.set("q", this.token)
            url.searchParams.set("download", download.toString())
        }
        return url
    }

    strUrl(download = false) {
        return this.url(download).toString()
    }
}