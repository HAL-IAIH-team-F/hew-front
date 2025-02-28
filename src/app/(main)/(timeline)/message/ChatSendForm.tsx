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
    if (!message.trim() || clientContext.state !== "registered" || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await clientContext.client.authBody(Api.app.pcm_api_chat__chat_id__message_post,
        {},
        {
          message: message, images: []
        },
        { chat_id: chat.chat_id},
      )

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

  const isDisabled = !message.trim() || clientContext.state !== "registered" || isSubmitting;

  return (
    <div className="w-full bg-gray-800 p-4 shadow-lg rounded-lg border border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-indigo-400 bg-gray-700 hover:bg-gray-600 rounded-full transition-all"
          aria-label="添付"
        >
          <PaperClipIcon className="w-5 h-5" />
        </button>
        
        <div className="flex-1 bg-gray-700 rounded-lg border border-gray-600 focus-within:border-indigo-500 transition-colors overflow-hidden">
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
            className="w-full bg-transparent text-white resize-none outline-none p-3 max-h-32 placeholder-gray-400"
            rows={1}
          />
        </div>
        
        <button
          type="submit"
          disabled={isDisabled}
          className={`p-3 rounded-full transition-all shadow-md ${
            !isDisabled
              ? "text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95"
              : "text-gray-400 bg-gray-700 cursor-not-allowed"
          }`}
          aria-label="送信"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}