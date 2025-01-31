import {LoadedClientState} from "~/api/context/ClientState";
import {Api} from "~/api/context/Api";

export default async function fetchTimelineProduct(
  clientState: LoadedClientState, limit: number,
) {
  const result = await clientState.client.unAuthOrAuth(
    Api.app.gts_api_timeline_get, {}, {limit: limit}
  )
  if (result.error) console.error(result.error)
  return result
}