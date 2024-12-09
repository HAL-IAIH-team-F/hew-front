export interface NotificationRes {
  notification_id: string;
  data: CollaboData | CollaboApproveData
}

interface Data {
  notification_type: string
}

export interface CollaboData extends Data {
  notification_type: "colab"
  collabo_id: string
  sender_creator_id: string
}

export interface CollaboApproveData extends Data {
  notification_type: "colab_approve"
  collabo_id: string
  approve_id: string
}
