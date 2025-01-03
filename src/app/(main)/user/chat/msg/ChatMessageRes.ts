export interface ChatMessageRes {
  chat_id: string
  messages: MessageRes[]
}

export interface MessageRes {
  post_user_id: string
  chat_message_id: string
  index: number
  message: string
  images: string[]
}