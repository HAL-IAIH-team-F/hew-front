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

  useEffect(() => {
    if (clientState.state !== "registered") return;
    clientState.client.auth(Api.app.gcs_api_chat_get, {}, {}).then((value) => {
      if (value.error) return setErr(value.error);
      setChats(value.success);
      
    });
  }, [clientState.state]);

  return (
    <div className="p-4">
      {chats?.map((chat) => (
        <div
          key={chat.chat_id}
          className={`p-1 rounded-lg mb-3 hover:bg-gray-700 transition cursor-pointer
            flex items-center
            ${chat.chat_id === selectedChatId ? "bg-gray-600 border-gray-500" : "bg-gray-800"}`}
          onClick={() => onSelect(chat)}
        >
          {/* ユーザーリスト */}
          <div className="flex flex-wrap gap-2.5 min-h-[48px] "> 
            {chat.users.map((userId) => (
              <UserIconCard userId={userId} key={userId} />
            ))}
          </div>
        </div>
      ))}

      {err && (
        <div className="mt-4 p-3 bg-red-600 text-white text-sm rounded-lg">
          <ErrorMessage error={err} />
        </div>
      )}
      
    </div>
  );
}

