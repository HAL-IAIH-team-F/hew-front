"use client";
import React, { useEffect, useState } from "react";
import { ChatRes } from "@/(main)/(timeline)/message/ChatRes";
import Chat from "@/(main)/(timeline)/message/Chat";
import ChatList from "@/(main)/(timeline)/message/ChatList";
import { useClientState } from "~/api/context/ClientContextProvider";
import LoginNeed from "~/UI/loginNeed";

export default function Page() {
  const [chat, setChat] = useState<ChatRes | null>(null);
  const clientState = useClientState();
  
  if (clientState.state !== "registered") {
    return (
      <div className="h-screen w-screen items-center justify-center bg-gray-900">
        <LoginNeed />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      {/* 左側：ユーザーリスト */}
      <div className="border-r border-gray-700 overflow-y-auto ">
        <ChatList onSelect={setChat} selectedChatId={chat?.chat_id || null} />
      </div>

      {/* 右側：チャット画面 */}
      <div
        className="flex-1 flex flex-col overflow-y-auto "

      >
        {chat ? (
          <Chat key={chat.chat_id} chat={chat} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            チャットを選択してください
          </div>
        )}
        
      </div>
      
    </div>
  );
}
