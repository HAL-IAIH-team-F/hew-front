import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {TimelineRouteUrl} from "~/route/TimelineRouteUrl";
import {TimelinePageRouteUrl} from "~/route/TimelinePageRouteUrl";
import {RouteUrl} from "~/route/RouteUrl";
import {UserRes} from "~/res/UserRes";
import {AccountRoutes} from "~/route/AccountRoutes";
import {ColabRoutes} from "~/route/ColabRoutes";

export class Routes {
  readonly account: AccountRoutes
  readonly colab: ColabRoutes

  constructor(
      readonly prevParams: URLSearchParams,
      readonly currentPath: string,
      readonly router: AppRouterInstance,
      loginUser: undefined | UserRes,
  ) {
    this.account = new AccountRoutes(loginUser, this)
    this.colab = new ColabRoutes(loginUser, this)
  }

  setParam(key: string, value: string | undefined) {
    const newParams = new URLSearchParams(this.prevParams)
    if (value == undefined) newParams.delete(key)
    else newParams.set(key, value)
    this.router.push(this.currentPath + "?" + newParams.toString())
  }

  timeline() {
    return new TimelineRouteUrl(this, "/")
  }

  search() {
    return new TimelinePageRouteUrl(this, "/search", "/search")
  }

  notification() {
    return new TimelinePageRouteUrl(this, "/notification", "/notification")
  }

  message() {
    return new TimelinePageRouteUrl(this, "/message", "/message")
  }

  productListing() {
    return new TimelinePageRouteUrl(this, "/product/listing", "/product/listing")
  }

  cart() {
    return new TimelinePageRouteUrl(this, "/cart", "/cart")
  }

  lp() {
    return new RouteUrl(this, "/lp")
  }

  lpDescription() {
    return new RouteUrl(this, "/lp/description")
  }

  lpRegister() {
    return new RouteUrl(this, "/lp/register")
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