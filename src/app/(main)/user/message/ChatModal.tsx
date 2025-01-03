"use client"

import {FC, useState} from "react";
import ChatList from "@/(main)/user/message/ChatList";
import {ChatRes} from "@/(main)/user/message/ChatRes";
import Chat from "@/(main)/user/message/Chat";

const ChatModal: FC = () => {
  const [chat, setChat] = useState<ChatRes>()
  return (
    chat
      ? <Chat chat={chat}/>
      : <ChatList onSelect={setChat}/>
  );
};

export default ChatModal;