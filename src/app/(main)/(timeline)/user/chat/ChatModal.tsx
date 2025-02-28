"use client"

import {FC, useState} from "react";
import ChatList from "@/(main)/(timeline)/user/chat/ChatList";
import {ChatRes} from "~/res/ChatRes";
import Chat from "@/(main)/(timeline)/user/chat/Chat";

const ChatModal: FC = () => {
  const [chat, setChat] = useState<ChatRes>()
  return (
    chat
      ? <Chat chat={chat}/>
      : <ChatList onSelect={setChat}/>
  );
};

export default ChatModal;