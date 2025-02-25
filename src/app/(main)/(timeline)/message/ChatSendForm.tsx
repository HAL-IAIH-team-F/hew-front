import { ChatRes } from "./ChatRes";
import { useClientState } from "~/api/context/ClientContextProvider";
import { Api } from "~/api/context/Api";
import { MessageRes } from "@/(main)/(timeline)/message/msg/ChatMessagesRes";
import { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon, PaperClipIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function ChatSendForm(
  {
    chat, onSend,
  }: {
    chat: ChatRes,
    onSend?: (chat: MessageRes) => void,
  },
) {
  const clientContext = useClientState();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 150) + "px";
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("chadawdawwd",chat.chat_id)
    if (!message.trim() || clientContext.state !== "registered" || isSubmitting) return;

    setIsSubmitting(true);
    try {
      console.log("送信中のメッセージ:", message.trim());
      console.log("chat:", chat);
      const result = await clientContext.client.authBody(Api.app.pcm_api_chat__chat_id__message_post,
        {},
        {
          message: message, images: []
        },
        { chat_id: chat.chat_id},
      )

      console.log("API response:", result);
      if (result.error) {
        console.error("エラー:", result.error);
        return;
      }

      onSend && onSend(result.success);
      setMessage("");  
    } catch (error) {
      console.error("送信エラー:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gray-700 p-4 rounded-md">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <button type="button" className="text-gray-300 hover:text-white p-2 rounded-full transition-colors" aria-label="添付ファイル">
          <PaperClipIcon className="w-5 h-5" />
        </button>
        <button type="button" className="text-gray-300 hover:text-white p-2 rounded-full transition-colors" aria-label="その他">
          <PlusIcon className="w-5 h-5" />
        </button>
        <div className="flex-1 bg-gray-800 rounded-md px-4 py-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);  
              }
            }}
            placeholder={clientContext.state === "registered" ? "メッセージを入力..." : "ログインして会話に参加"}
            disabled={clientContext.state !== "registered"}
            className="w-full bg-transparent text-white resize-none outline-none py-1 max-h-32 placeholder-gray-400"
            rows={1}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || clientContext.state !== "registered" || isSubmitting}
          className={`p-2 rounded-full transition-colors ${
            message.trim() && clientContext.state === "registered" && !isSubmitting
              ? "text-white bg-indigo-500 hover:bg-indigo-600"
              : "text-gray-500 bg-gray-600 cursor-not-allowed"
          }`}
          aria-label="送信"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
