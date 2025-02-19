import {ChatRes} from "@/(main)/(timeline)/message/ChatRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import ChatSendForm from "@/(main)/(timeline)/message/ChatSendForm";
import {MessageRes} from "@/(main)/(timeline)/message/msg/ChatMessagesRes";
import ChatMsgImg from "@/(main)/(timeline)/message/ChatMsgImg";
import UserIconCard from "~/Icon/UserIconCard";

export default function Chat(
    {
      chat,
    }: {
      chat: ChatRes,
    },
) {
  const clientContext = useClientState()
  const [err, setErr] = useState<ErrorData>()
  const [msgs, setMsgs] = useState<MessageRes[]>()
  useEffect(() => {
    if (clientContext.state != "registered") return
    clientContext.client.auth(Api.app.gcms_api_chat__chat_id__message_get, {}, {chat_id: chat.chat_id})
        .then(value => {
          if (value.error) return setErr(value.error)
          setMsgs(value.success.messages)
        })
  }, [clientContext.state]);

  return (
      <div className="h-full overflow-y-scroll p-4 bg-gray-900">
        {/* メッセージリスト */}
        <div className="space-y-6">
          {msgs
              ?.sort((e, b) => e.index - b.index) // メッセージをインデックス順にソート
              .map((value) => (
                  <div
                      key={value.chat_message_id}
                      className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                  >
                    {/* ユーザーアイコンとメッセージ内容 */}
                    <div className="flex items-start gap-4">
                      {/* ユーザー情報 (アイコンなど) */}
                      <UserIconCard userId={value.post_user_id}/>

                      {/* メッセージ内容 */}
                      <div className="flex-grow">
                        {/* メッセージ本文を大きく */}
                        <p className="text-gray-300 text-lg leading-relaxed">{value.message}</p>

                        {/* 画像がある場合 */}
                        {value.images && (
                            <div className="mt-2 grid grid-cols-3 gap-4">
                              {value.images.map((img_uuid, idx) => (
                                  <ChatMsgImg key={idx} img_uuid={img_uuid}/>
                              ))}
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
              ))}
        </div>


        {/* エラーメッセージ表示 */}
        {err && (
            <div className="mt-4 p-3 bg-red-600 text-white text-sm rounded-lg">
              <ErrorMessage error={err}/>
            </div>
        )}

        {/* 送信フォーム */}
        <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
          <ChatSendForm chat={chat} onSend={chat => {
            setMsgs(prevState => [...prevState || [], chat])
          }}/>
        </div>
      </div>
  )
}
