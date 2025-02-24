import {TimelinePageRouteUrl} from "~/route/TimelinePageRouteUrl";
import {SelfUserRes} from "~/res/reses";
import {Routes} from "~/route/Routes";

export class AccountRoutes {
  constructor(
      readonly loginUser: undefined | SelfUserRes,
      readonly routes: Routes
  ) {
  }


  account(userId: string | undefined = undefined) {
    return new TimelinePageRouteUrl(this.routes, this.accountPath(userId), "/account")
  }


  creatorRegister() {
    return new TimelinePageRouteUrl(this.routes, `/account/creator/register`, "/account")
  }

  history() {
    return new TimelinePageRouteUrl(this.routes, `/account/history`, "/account")
  }

  setting() {
    return new TimelinePageRouteUrl(this.routes, `/account/setting`, "/account")
  }

  private accountPath(userId: string | undefined) {
    if (userId != undefined)
      return `/account/${userId}`
    if (this.loginUser != undefined)
      return `/account/${this.loginUser.user_id}`
    return `/account`
  }
}