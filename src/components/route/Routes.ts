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

    productListing() {
        return new TimelinePageRouteUrl(this, "/product/listing")
    }

    cart() {
        return new TimelinePageRouteUrl(this, "/cart")
    }

   userRegister(){
       return new RouteUrl(this, "/lp")
   }
}