"use client";
import React, { useEffect, useState } from "react";
import { ChatRes } from "@/(main)/(timeline)/message/ChatRes";
import Chat from "@/(main)/(timeline)/message/Chat";
import ChatList from "@/(main)/(timeline)/message/ChatList";
import { useClientState } from "~/api/context/ClientContextProvider";
import LoginNeed from "~/UI/loginNeed";
import { Menu, X } from "lucide-react";

export default function Page() {
  const [chat, setChat] = useState<ChatRes | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const clientState = useClientState();
  
  if (clientState.state !== "registered") {
    return (
      <div className="h-screen w-screen items-center justify-center bg-gray-900">
        <LoginNeed />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col sm:flex-row bg-gray-900 text-white">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="sm:hidden p-4 text-gray-100 flex items-center gap-2"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-6 h-6" /> 
      </button>

      {/* チャットリスト（サイドバー） */}
      <div
        className={`
          fixed sm:relative bg-gray-900 border-r border-gray-700 h-full w-74 
          sm:block transition-transform transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          {/* Close Button (Mobile) */}
          <button
            className="sm:hidden p-4 text-gray-100 flex items-center gap-2 self-end"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" /> 閉じる
          </button>
          
          <ChatList onSelect={setChat} selectedChatId={chat?.chat_id || null} />
        </div>
      </div>

      {/* チャット画面 */}
      <div className="flex-1 flex flex-col overflow-y-auto">
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
