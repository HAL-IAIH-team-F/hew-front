import {ChatRes} from "~/res/ChatRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../../util/err/err";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";
import ChatSendForm from "@/(main)/(timeline)/user/chat/ChatSendForm";
import {ChatMessageRes} from "@/(main)/(timeline)/user/chat/msg/ChatMessageRes";

export default function Chat(
  {
    chat,
  }: {
    chat: ChatRes,
  },
) {
  const clientContext = useClientState()
  const [err, setErr] = useState<ErrorData>()
  const [msgs, setMsgs] = useState<ChatMessageRes>()
  useEffect(() => {
    if (clientContext.state != "registered") return
    clientContext.client.auth(Api.app.gcms_api_chat__chat_id__message_get, {}, {chat_id: chat.chat_id})
      .then(value => {
        if (value.error) return setErr(value.error)
        setMsgs(value.success)
      })
  }, [clientContext.state]);

  return (
    <div className={"h-full overflow-y-scroll"}>
      {msgs?.messages.sort((e, b) => e.index - b.index).map(value => <div
        key={value.chat_message_id}
      >
        <p>post_user_id: {value.post_user_id}</p>
        <p>chat_message_id: {value.chat_message_id}</p>
        <p>index: {value.index}</p>
        <p>message: {value.message}</p>
        <p>images: {value.images}</p>
      </div>)}
      <ErrorMessage error={err}/>
      <ChatSendForm chat={chat}/>
    </div>
  )
}
