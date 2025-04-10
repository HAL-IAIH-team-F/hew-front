export interface NotificationRes {
  notification_id: string;
  data: ColabRequestData | ColabData | ColabApproveData | ColabWantData;
}

interface Data {
  notification_type: "colab_approve" | "colab" | "colab_request" | "colab_want"
}

export interface ColabRequestData extends Data {
  colab_request_id: string
  from_creator_id: string
  
}

export interface ColabWantData extends Data {
  colab_want_id: string
  from_creator_id: string
}


export interface ColabApproveData extends Data {
  collabo_id: string
  collabo_approve_id: string
  colab_creator_id: string
}

export interface ColabData extends Data {
  collabo_id: string;
  owner_id: string;
  title: string;
  description: string;
  creator_ids: string[];
  isApproved?: boolean; 
}