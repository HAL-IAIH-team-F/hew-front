"use client"
import React, {useState} from "react";
import {ChatRes} from "@/(main)/(timeline)/message/ChatRes";
import Chat from "@/(main)/(timeline)/message/Chat";
import ChatList from "@/(main)/(timeline)/message/ChatList";
import { useClientState } from "~/api/context/ClientContextProvider";
import LoginNeed from "~/UI/loginNeed";


export default function Page(
    {}: {}
) {
  const [chat, setChat] = useState<ChatRes>()
  const clientState = useClientState()
  if (clientState.state !== "registered") {
    return (
        <div>
          <LoginNeed/>
        </div>
    )
}
  return (
      chat
          ? <Chat chat={chat}/>
          : <ChatList onSelect={setChat}/>
  );
}

