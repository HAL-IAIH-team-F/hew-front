export interface NotificationRes {
  notification_id: string;
  data: ColabRequestData | ColabData
}

interface Data {
  notification_type: "colab" | "colab_request"
}

export interface ColabRequestData extends Data {
  colab_request_id: string
  from_creator_id: string
}

export interface ColabData extends Data {
  collabo_id: string
  owner_id: string
  title: string
  description: string
  creator_ids: string[]
}
