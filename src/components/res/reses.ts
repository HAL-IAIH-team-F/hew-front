export interface UserRes extends UserData {
  user_id: string
  name: string
  screen_id: string
  icon: ImgRes | null
  register_date: string
  user_mail: string
  creator_data: {
    creator_id: string,
    contact_address: string
  } | undefined | null
}

export interface UserData {
}

export interface CreatorRes {
  creator_id: string;
  contact_address: string;
  user_data: UserData;
}

export interface ImgRes {
  image_uuid: string
  token?: string | null
}