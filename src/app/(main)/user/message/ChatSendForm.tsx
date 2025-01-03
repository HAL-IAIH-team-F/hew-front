import {ChatRes} from "./ChatRes";
import {StyledForm} from "../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../util/form/element/StyledInput";
import {StyledButton} from "../../../../util/form/element/StyledButton";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";

export default function ChatSendForm(
  {
    chat,
  }: {
    chat: ChatRes,
  },
) {
  const clientContext = useClientContextState()

  return (
    <StyledForm disabled={clientContext.state != "authenticated"} action={async formData => {
      if (clientContext.state != "authenticated") throw new Error("not authenticated")
      clientContext.client.authBody(Api.app.pcm_api_chat__chat_id__message_post,
        {},
        {
          message: "", images: []
        },
        {chat_id: ""},
      )
    }}>
      <StyledInput name={"msg"}/>
      <StyledButton>send</StyledButton>
    </StyledForm>
  )
}
