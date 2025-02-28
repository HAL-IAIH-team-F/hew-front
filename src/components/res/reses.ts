import {UserData, UserDataWithImg} from "~/res/UserRes";

export interface CreatorRes {
  creator_id: string;
  contact_address: string;
  user_data: UserData;
}

export interface ImgRes {
  image_uuid: string
  token?: string | null
}


export interface CreatorResWithImg extends Omit<CreatorRes, 'user_data'> {
  user_data: UserDataWithImg
}
