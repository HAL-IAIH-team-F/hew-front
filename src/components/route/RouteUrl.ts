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

  isCurrent() {
    return this.routes.currentPath == this.path
  }

  transition(event: React.UIEvent | undefined = undefined) {
    event?.preventDefault()
    const tempPathname = this.animationTempPathname()
    const tempParams = this.animationTempParams()
    if (tempPathname == undefined && tempParams == undefined) {
      this.routes.router.push(this.toString())
      return
    }
    const tempUrl = (tempPathname != undefined ? tempPathname : this.pathname())
      + "?" + (tempParams != undefined ? tempParams?.toString() : this.params().toString())
    console.debug("tempUrl", tempUrl)
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