import {RouteUrl} from "~/route/RouteUrl";

export class TimelineRouteUrl extends RouteUrl {
  private productId: string | undefined = this.prevProductId();

  setProductId(productId: string | undefined) {
    this.productId = productId;
    return this
  }

  override params(): URLSearchParams {
    const params = new URLSearchParams()
    if (this.productId) params.set("productId", this.productId)
    else params.delete("productId")
    return params
  }

  override animationTempParams(): URLSearchParams | undefined {
    const prevId = this.prevProductId()
    if (this.productId == prevId) return undefined
    if (prevId == undefined) return undefined
    const params = new URLSearchParams()
    params.delete("productId")
    return params;
  }

  private prevProductId() {
    return this.routes.prevParams.get("productId") || undefined
  }
}