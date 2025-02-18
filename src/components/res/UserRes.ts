export interface UserRes {
  user_id: string
  name: string
  screen_id: string
  icon: ImgRes | null
  register_date: string
  user_mail: string
  creator_data: {
    creator_id: string,
    contact_address: string
  } | undefined
}

export interface ImgRes {
  image_uuid: string
  token?: string | null
}