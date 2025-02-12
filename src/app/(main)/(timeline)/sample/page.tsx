"use client"

import {useClientState} from "~/api/context/ClientContextProvider"
import {Api} from "~/api/context/Api";
import {RegisteredClientState} from "~/api/context/ClientState";
import {useEffect, useState} from "react";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

export default function Page(
    {}: {}
) {
  const clientState = useClientState()
  const [err, setErr] = useState<string>()
  const [name, setName] = useState<string>()
  useEffect(() => {
    if (clientState.state != "registered") return
    if (name == undefined) return
    const timeout = setTimeout(() => {
      putUserName(clientState, name, setErr).catch(console.error)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [name]);
  useEffect(() => {
    if (clientState.state != "registered") return
    setName(clientState.user.user_name)
  }, [clientState.state == "registered" && clientState.user.user_name]);

  return clientState.state == "registered" && <div>
    <ErrorMessage error={err}/>
    <h2>icon</h2>
    <input type="file" onInput={(event) => {
      const files = event.currentTarget.files
      putUserIcon(clientState, files && files?.length != 0 ? files[0] : undefined, setErr).catch(console.error)
    }}/>
    <input type={"text"} value={name} onInput={(event) => {
      setName(event.currentTarget.value)
    }}/>
  </div>
}

async function putUserIcon(
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

  const result = await clientState.client.authBody(Api.app.put_user____api_user_put, {}, {
    user_name: clientState.user.user_name,
    user_icon_uuid: iconUuid
  }, {})

  if (result.error) {
    setErr(result.error.error_id + ": " + result.error.message);
    return
  }
  clientState.set({...clientState, user: result.success})
}

async function putUserName(
    clientState: RegisteredClientState, user_name: string,
    setErr: (er: string) => void
) {
  const result = await clientState.client.authBody(Api.app.put_user____api_user_put, {}, {
    user_name: user_name,
    user_icon_uuid: clientState.user.user_icon?.image_uuid || null
  }, {})

  if (result.error) {
    setErr(result.error.error_id + ": " + result.error.message);
    return
  }
  clientState.set({...clientState, user: result.success})
}