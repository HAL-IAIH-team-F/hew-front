import {Routes} from "~/route/Routes";
import React from "react";

export class RouteUrl {
  constructor(
    protected readonly routes: Routes,
    protected readonly path: string,
  ) {
  }

  toString() {
    return `${this.pathname()}?${this.params().toString()}`
  }

  transition(event: React.UIEvent | undefined = undefined) {
    event?.preventDefault()
    console.debug("transition", this)
    const tempPathname = this.animationTempPathname()
    const tempParams = this.animationTempParams()
    if (tempPathname == undefined && tempParams == undefined) {
      this.routes.router.push(this.toString())
      return
    }
    const tempUrl = (tempPathname || this.pathname()) + "?" + (tempParams?.toString() || this.params().toString())
    console.debug("transition tempUrl", tempUrl)
    this.routes.router.replace(tempUrl);
    setTimeout(() => {
      this.routes.router.push(this.toString())
    }, 300);

  }

  pathname(): string {
    return this.path;
  }

  protected animationTempPathname(): string | undefined {
    return undefined;
  }

  protected animationTempParams(): URLSearchParams | undefined {
    return undefined;
  }

  protected params(): URLSearchParams {
    return this.routes.prevParams;
  }
}