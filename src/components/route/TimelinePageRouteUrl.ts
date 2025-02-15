import {TimelineRouteUrl} from "~/route/TimelineRouteUrl";
import {Routes} from "~/route/Routes";

export class TimelinePageRouteUrl extends TimelineRouteUrl {
  constructor(
      routes: Routes,
      path: string,
      readonly windowPath: string
  ) {
    super(routes, path);
  }

  override animationTempPathname() {
    if (this.routes.currentPath.startsWith(this.windowPath)) return undefined
    return this.routes.timeline().pathname()
  }
}