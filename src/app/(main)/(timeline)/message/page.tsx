"use client"
import React, {useState} from "react";
import {ChatRes} from "@/(main)/(timeline)/message/ChatRes";
import Chat from "@/(main)/(timeline)/message/Chat";
import ChatList from "@/(main)/(timeline)/message/ChatList";


export default function Page(
    {}: {}
) {
  const [chat, setChat] = useState<ChatRes>()
  return (
      chat
          ? <Chat chat={chat}/>
          : <ChatList onSelect={setChat}/>
  );
}

