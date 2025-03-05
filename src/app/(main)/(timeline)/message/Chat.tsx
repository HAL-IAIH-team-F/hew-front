import { ChatRes } from "@/(main)/(timeline)/message/ChatRes";
import { useClientState } from "~/api/context/ClientContextProvider";
import { useEffect, useState, useRef } from "react";
import { Api } from "~/api/context/Api";
import { ErrorData } from "../../../../util/err/err";
import { ErrorMessage } from "../../../../util/err/ErrorMessage";
import ChatSendForm from "@/(main)/(timeline)/message/ChatSendForm";
import { MessageRes } from "@/(main)/(timeline)/message/msg/ChatMessagesRes";
import ChatMsgImg from "@/(main)/(timeline)/message/ChatMsgImg";
import UserIconCard from "~/Icon/UserIconCard";

export default function Chat({ chat }: { chat: ChatRes }) {
  const clientContext = useClientState();
  const [err, setErr] = useState<ErrorData>();
  const [msgs, setMsgs] = useState<MessageRes[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clientContext.state !== "registered") return;

    clientContext.client
      .auth(Api.app.gcms_api_chat__chat_id__message_get, {}, { chat_id: chat.chat_id })
      .then((value) => {
        if (value.error) return setErr(value.error);
        setMsgs(value.success.messages);
      });
  }, [clientContext.state]);

  useEffect(() => {
    // メッセージが更新されたら、スクロールを最下部へ
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [msgs]);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* メッセージ一覧のスクロール可能エリア */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
        style={{
          height: "calc(100vh - 150px)", // 送信フォームの高さ分調整
          maxHeight: "calc(100vh - 220px)",
          boxSizing: "border-box",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {msgs
          ?.sort((a, b) => a.index - b.index)
          .map((value) => (
            <div key={value.chat_message_id} className="flex items-start">
              {/* ユーザーアイコン */}
              <UserIconCard userId={value.post_user_id} />

              {/* メッセージ本文 */}
              <div className="bg-gray-700 p-3 rounded-lg w-fit max-w-3xl">
                <p className="text-gray-300 text-base">{value.message}</p>

                {/* 画像がある場合 */}
                {value.images && (
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    {value.images.map((img_uuid, idx) => (
                      <ChatMsgImg key={idx} img_uuid={img_uuid} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

        {/* スクロール用のターゲット */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* エラーメッセージ表示 */}
      {err && (
        <div className="p-3 bg-red-600 text-white text-sm rounded-lg">
          <ErrorMessage error={err} />
        </div>
      )}

      {/* メッセージ送信フォーム */}
      <div className="sticky bottom-10 pb-10 bg-gray-800 p-1 border-t border-gray-700">
          <ChatSendForm chat={chat} onSend={chat => {
            setMsgs(prevState => [...prevState || [], chat])
          }}/>
      </div>
    </div>
  );
}
