import {ErrorMessage} from "../../../../../util/err/ErrorMessage";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {ChatRes} from "~/res/ChatRes";
import {ErrorData} from "../../../../../util/err/err";
import {Api} from "~/api/context/Api";

export default function ChatList(
  {
    onSelect,
  }: {
    onSelect: (chat: ChatRes) => void,
  },
) {
  const clientState = useClientState()
  const [chats, setChats] = useState<ChatRes[]>([])
  const [err, setErr] = useState<ErrorData>()
  useEffect(() => {
    if (clientState.state != "registered") return
    clientState.client.auth(Api.app.gcs_api_chat_get, {},{}).then(value => {
      if (value.error) return setErr(value.error)
      setChats(value.success)
    })
  }, [clientState.state]);


  return (
    <div>
      {chats?.map(value => <div
        key={value.chat_id} onClick={() => onSelect(value)}
      >
        <p>chatId: {value.chat_id}</p>
        <div>
          {value.users.map(value1 => <p key={value1}>userId: {value1}</p>)}
        </div>
      </div>)}
      <ErrorMessage error={err}/>
    </div>
  )
}
