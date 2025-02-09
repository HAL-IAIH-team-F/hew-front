import {TimelineRouteUrl} from "~/route/TimelineRouteUrl";

export class TimelinePageRouteUrl extends TimelineRouteUrl {
  override animationTempPathname() {
    const pathname = this.pathname()
    if (pathname == this.routes.currentPath) return undefined
    return this.routes.timeline().pathname()
  }
}