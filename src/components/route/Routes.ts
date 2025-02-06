import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {TimelineRouteUrl} from "~/route/TimelineRouteUrl";
import {TimelinePageRouteUrl} from "~/route/TimelinePageRouteUrl";
import {RouteUrl} from "~/route/RouteUrl";

export class Routes {
    constructor(
        readonly prevParams: URLSearchParams,
        readonly prevPath: string,
        readonly router: AppRouterInstance,
    ) {
    }

    setParam(key: string, value: string | undefined) {
        const newParams = new URLSearchParams(this.prevParams)
        if (value == undefined) newParams.delete(key)
        else newParams.set(key, value)
        this.router.push(this.prevPath + "?" + newParams.toString())
    }

    timeline() {
        return new TimelineRouteUrl(this, "/")
    }

    lp() {
        return new RouteUrl(this, "/lp")
    }

    search() {
        return new TimelinePageRouteUrl(this, "/search")
    }

    notification() {
        return new TimelinePageRouteUrl(this, "/notification")
    }

    message() {
        return new TimelinePageRouteUrl(this, "/message")
    }

    account() {
        return new TimelinePageRouteUrl(this, "/account")
    }

    colablisting() {
        return new TimelinePageRouteUrl(this, "/colablisting")
    }

    productListing() {
        return new TimelinePageRouteUrl(this, "/product/listing")
    }

    cart() {
        return new TimelinePageRouteUrl(this, "/cart")
    }

    // joinToTimelinePath(path: string) {
    //   let result
    //   if (timeline.endsWith("/")) result = timeline.slice(0, -1)
    //   else result = timeline
    //   if (path.startsWith("/")) result += path
    //   else result += "/" + path
    //   return result
    // }
}