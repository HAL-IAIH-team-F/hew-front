import { ErrorMessage } from "../../../../util/err/ErrorMessage";
import { useClientState } from "~/api/context/ClientContextProvider";
import { useEffect, useState } from "react";
import { ChatRes } from "@/(main)/(timeline)/message/ChatRes";
import { ErrorData } from "../../../../util/err/err";
import { Api } from "~/api/context/Api";
import UserIconCard from "~/Icon/UserIconCard";
import ChatSendForm from "./ChatSendForm";

export default function ChatList({
  onSelect,
  selectedChatId,
}: {
  onSelect: (chat: ChatRes) => void;
  selectedChatId: string | null;
}) {
  const clientState = useClientState();
  const [chats, setChats] = useState<ChatRes[]>([]);
  const [err, setErr] = useState<ErrorData>();

  // `clientState.user.user_id` を安全に取得（null の可能性を排除）
  const userId = clientState.state === "registered" ? clientState.user.user_id : null;

  useEffect(() => {
    if (clientState.state !== "registered") return;
    clientState.client.auth(Api.app.gcs_api_chat_get, {}, {}).then((value) => {
      if (value.error) return setErr(value.error);
      setChats(value.success);
    });
  }, [clientState.state]);

  return (
    <div className="p-4">
      {chats?.map((chat) => {
        if (!userId) return null; // userId が null なら描画しない

        // 自分以外のユーザーを取得
        const otherUsers = chat.users.filter((id) => id !== userId);

        // 他のユーザーがいない場合は、自分を表示
        const displayUsers = otherUsers.length > 0 ? otherUsers : [userId];

        return (
          <div
            key={chat.chat_id}
            className={`p-1 rounded-lg mb-3 hover:bg-gray-700 transition cursor-pointer
              flex items-center
              ${chat.chat_id === selectedChatId ? "bg-gray-600 border-gray-500" : "bg-gray-800"}`}
            onClick={() => onSelect(chat)}
          >
            {/* ユーザーリスト（自分しかいない場合は自分を表示） */}
            <div className="flex flex-wrap gap-2.5 min-h-[48px]"> 
              {displayUsers.map((id) => (
                <UserIconCard userId={id} key={id} />
              ))}
            </div>
          </div>
        );
      })}

      {err && (
        <div className="mt-4 p-3 bg-red-600 text-white text-sm rounded-lg">
          <ErrorMessage error={err} />
        </div>
      )}
    </div>
  );
}
