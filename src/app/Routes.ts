export namespace Routes {
  export const timeline = "/"
  export const lp = "/lp"

  export function joinToTimelinePath(path: string) {
    let result
    if (timeline.endsWith("/")) result = timeline.slice(0, -1)
    else result = timeline
    if (path.startsWith("/")) result += path
    else result += "/" + path
    return result
  }
}