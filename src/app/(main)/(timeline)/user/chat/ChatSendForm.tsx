import {ChatRes} from "~/res/ChatRes";
import {StyledForm} from "../../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../../util/form/element/StyledInput";
import {StyledButton} from "../../../../../util/form/element/StyledButton";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";

export default function ChatSendForm(
  {
    chat,
  }: {
    chat: ChatRes,
  },
) {
  const clientContext = useClientState()

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
    }}>
      <StyledInput name={"msg"}/>
      <StyledButton>send</StyledButton>
    </StyledForm>
  )
}
