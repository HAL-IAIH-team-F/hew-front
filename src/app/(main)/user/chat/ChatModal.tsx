"use client"

import {FC, useState} from "react";
import ChatList from "@/(main)/user/chat/ChatList";
import {ChatRes} from "@/(main)/user/chat/ChatRes";
import Chat from "@/(main)/user/chat/Chat";

const ChatModal: FC = () => {
  const [chat, setChat] = useState<ChatRes>()
  return (
    chat
      ? <Chat chat={chat}/>
      : <ChatList onSelect={setChat}/>
  );
};

export default ChatModal;