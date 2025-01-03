import {ChatRes} from "@/(main)/user/message/ChatRes";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import ChatSendForm from "@/(main)/user/message/ChatSendForm";

export default function Chat(
  {
    chat,
  }: {
    chat: ChatRes,
  },
) {
  const clientContext = useClientContextState()
  const [err, setErr] = useState<ErrorData>()
  useEffect(() => {
    if (clientContext.state != "authenticated") return
    clientContext.client.auth(Api.app.gcms_api_chat__chat_id__message_get, {}, {chat_id: chat.chat_id})
      .then(value => {
        if (value.error) return setErr(value.error)
      })
  }, [clientContext.state]);

  return (
    <div>
      <ErrorMessage error={err}/>
      <ChatSendForm chat={chat}/>
    </div>
  )
}
