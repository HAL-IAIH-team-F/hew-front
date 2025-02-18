import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {ChatRes} from "@/(main)/(timeline)/message/ChatRes";
import {ErrorData} from "../../../../util/err/err";
import {Api} from "~/api/context/Api";
import UserIconCard from "~/Icon/UserIconCard";

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
    clientState.client.auth(Api.app.gcs_api_chat_get, {}, {}).then(value => {
      if (value.error) return setErr(value.error)
      setChats(value.success)
    })
  }, [clientState.state]);


  return (
      <div className="p-4">
        {/* Chatリスト */}
        {chats?.map((value) => (
            <div
                key={value.chat_id}
                className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 mb-4 hover:bg-gray-700 transition"
                onClick={() => onSelect(value)}
            >
              {/* ユーザーリスト */}
              <div className="mt-2 space-y-1 flex flex-wrap gap-2.5">
                {value.users.map((value1) => (
                    <UserIconCard userId={value1} key={value1}/>
                ))}
              </div>
            </div>
        ))}

        {/* エラーメッセージ */}
        {err && (
            <div className="mt-4 p-3 bg-red-600 text-white text-sm rounded-lg">
              <ErrorMessage error={err}/>
            </div>
        )}
      </div>
  )
}
