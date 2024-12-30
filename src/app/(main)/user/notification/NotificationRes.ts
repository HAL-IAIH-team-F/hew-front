export interface NotificationRes {
  notification_id: string;
  data: CollaboData | any
}

interface Data {
  notification_type: "colab"
}

export interface CollaboData extends Data {
  collabo_id: string
  sender_creator_id: string
}
