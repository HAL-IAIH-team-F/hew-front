export interface NotificationRes {
  notification_id: string;
  notification_type: "colab"
  data: {
    sender_creator_id: string
  }
}