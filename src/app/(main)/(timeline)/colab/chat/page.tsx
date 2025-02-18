"use client"
import {useClientState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../../util/err/err";
import {ChatRes} from "~/res/ChatRes";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";

export default function Page(
    {}: {}
) {
  const clientState = useClientState()
  const [err, setErr] = useState<ErrorData>()
  const [chats, setChats] = useState<ChatRes[]>([])
  useEffect(() => {
    if (clientState.state != "registered") return
    clientState.client.auth(Api.app.gcs_api_chat_get, {}, {}).then(value => {
      if (value.error) return setErr(value.error)
      setChats(value.success)
    })
  }, [clientState.state]);

  return <div>
    <ErrorMessage error={err}/>
    {chats.map(value => <div key={value.chat_id}>
      {value.chat_id}
    </div>)}
  </div>
}