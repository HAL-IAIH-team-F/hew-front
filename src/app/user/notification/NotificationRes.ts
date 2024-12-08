export interface NotificationRes {
  notification_id: string;
  data: CollaboData
}

interface Data {
  notification_type: string
}

export interface CollaboData extends Data {
  notification_type: "colab"
  sender_creator_id: string
}
