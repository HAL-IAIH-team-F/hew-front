"use client"

import {FC, useEffect, useState} from "react";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import {ChatRes} from "@/(main)/user/message/ChatRes";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

const MessagePage: FC = () => {
  const clientState = useClientContextState()
  const [chats, setChats] = useState<ChatRes[]>([])
  const [err, setErr] = useState<ErrorData>()
  useEffect(() => {
    if (clientState.state != "authenticated") return
    clientState.client.auth(Api.app.gcs_api_chat_get, {}).then(value => {
      if (value.error) return setErr(value.error)
      setChats(value.success)
    })
  }, []);
  console.debug(chats)
  return (
    <div>
      {chats?.map(value => <div key={value.chat_id}>
        <p>chatId: {value.chat_id}</p>
        <div>
          {value.users.map(value1 => <p key={value1}>userId: {value1}</p>)}
        </div>
      </div>)}
      <ErrorMessage error={err}/>
    </div>
  );
};

export default MessagePage;