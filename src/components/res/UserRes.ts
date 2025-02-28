import {Img} from "~/api/context/Api";

export interface ImgRes {
  image_uuid: string
  token?: string | null
}
export interface SelfUserRes extends UserRes {
  register_date: string
  user_mail: string
}

export interface UserRes extends UserData {
  user_id: string
  creator_data: {
    creator_id: string,
    contact_address: string
  } | undefined | null
}

export interface UserData {
  name: string
  screen_id: string
  icon: ImgRes | null
  user_id: string,
}

export interface UserResWithImg extends Omit<UserRes, 'icon'> {
  icon: Img | undefined
}

export interface UserDataWithImg extends Omit<UserData, 'icon'> {
  icon: Img | undefined
}