import {ChatRes} from "./ChatRes";
import {StyledForm} from "../../../../util/form/element/StyledForm";
import {StyledButton} from "../../../../util/form/element/StyledButton";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import {StyledTextarea} from "../../../../util/form/element/StyledTextarea";
import {MessageRes} from "@/(main)/(timeline)/message/msg/ChatMessagesRes";
import {useState} from "react";

export default function ChatSendForm(
    {
      chat, onSend,
    }: {
      chat: ChatRes,
      onSend?: (chat: MessageRes) => void,
    },
) {
  const clientContext = useClientState()
  const update = useState(false)

  return (
      <StyledForm disabled={clientContext.state != "registered"} action={async formData => {
        if (clientContext.state != "registered") throw new Error("not authenticated")
        const msg = formData.getStr("msg")
        if (!msg) return

        const result = await clientContext.client.authBody(Api.app.pcm_api_chat__chat_id__message_post,
            {},
            {
              message: msg, images: []
            },
            {chat_id: chat.chat_id},
        )
        if (result.error) return formData.appendErrorData("submit", result.error)
        onSend && onSend(result.success)
        update[1](true)
      }}>
        <StyledTextarea update={update} name={"msg"} label={"メッセ―ジ"}/>
        <StyledButton>送信</StyledButton>
      </StyledForm>
  )
}
