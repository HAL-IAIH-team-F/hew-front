import {TimelinePageRouteUrl} from "~/route/TimelinePageRouteUrl";
import {UserRes} from "~/res/UserRes";
import {Routes} from "~/route/Routes";

export class ColabRoutes {
  constructor(
      readonly loginUser: undefined | UserRes,
      readonly routes: Routes
  ) {
  }



  recruit() {
    return new TimelinePageRouteUrl(this.routes, `/colab/recruit`, "/colab")
  }

  recruitRegister() {
    return new TimelinePageRouteUrl(this.routes, `/colab/recruit/register`, "/colab")
  }

  chat() {
    return new TimelinePageRouteUrl(this.routes, `/colab/chat`, "/colab")
  }

  colabRegister() {
    return new TimelinePageRouteUrl(this.routes, `/colab/register`, "/colab")
  }

}