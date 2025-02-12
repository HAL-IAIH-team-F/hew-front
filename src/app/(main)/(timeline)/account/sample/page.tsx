"use client"

import {useClientState} from "~/api/context/ClientContextProvider"
import {Api} from "~/api/context/Api";
import {RegisteredClientState} from "~/api/context/ClientState";
import {useState} from "react";

export default function Page(
    {}: {}
) {
  const clientState = useClientState()
  const [err, setErr] = useState<string>()

  return <div>
    <h2>icon</h2>
    <input type="file" onInput={(event) => {
      if (clientState.state != "registered") return

      const files = event.currentTarget.files
      putUser(clientState, files && files?.length != 0 ? files[0] : undefined,setErr).catch(console.error)
    }}/>
  </div>
}

async function putUser(
    clientState: RegisteredClientState, icon: File | undefined,
    setErr: (er: string) => void
) {
  let iconUuid: string | null = null
  if (icon) {
    const imgResult = await clientState.client.uploadImg(icon)
    if (imgResult.error) {
      setErr(imgResult.error.error_id + ": " + imgResult.error.message);
      return
    }
    iconUuid = imgResult.success.image_uuid
  }

  clientState.client.authBody(Api.app.put_user____api_user_put, {}, {
    user_name: clientState.user.user_name,
    user_icon_uuid: iconUuid
  }, {})
}