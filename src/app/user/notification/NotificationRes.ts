export interface NotificationRes {
  notification_id: string;
  data: CollaboData | CollaboApproveData
}

interface Data {
  notification_type: "colab_approve" | "colab"
}

export interface CollaboData extends Data {
  collabo_id: string
  sender_creator_id: string
}

export interface CollaboApproveData extends Data {
  collabo_id: string
  approve_id: string
}
