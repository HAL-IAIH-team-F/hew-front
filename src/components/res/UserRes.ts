export interface UserRes {
  user_id: string
  user_name: string
  user_screen_id: string
  user_icon: ImgRes | null
  user_date: string
  user_mail: string
}

export interface ImgRes {
  image_uuid: string
  token: string | null
}