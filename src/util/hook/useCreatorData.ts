"use client"
import {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";

import {RecruitRes} from "@/(main)/colab/recruit/RecruitRes";
import Recruit from "@/(main)/colab/recruit/Recruit";
import {Api, Img} from "~/api/context/Api";
import { ImgRes, UserRes } from "~/res/UserRes";
import { ErrorData } from "../err/err";

export interface UserData {
    user_id: string;
    name: string;
    screen_id: string;
    icon: ImgRes | null;
}

export interface CreatorResponse {
  creator_id: string;
  contact_address: string;
  user_data: UserData;
}

export default function useCreatorData({ creator_id }: { creator_id: string }) : [CreatorResponse | undefined, UserData | undefined, ErrorData | undefined] {
  const [user, setUser] = useState<UserData | undefined>();
  const [creatordata, setCreatordata] = useState<CreatorResponse | undefined>();
  const [err, setErr] = useState<ErrorData | undefined>();
  const client = useClientState();

  useEffect(() => {
    client.client.unAuth(Api.app.getcre_api_creator__creator_id__get, {}, { creator_id: creator_id }).then(value => {
      if (value.error) {
        setErr(value.error);
        return;
      }
      setCreatordata(value.success);

      if (value.success.user_data.icon) {
        Img.create(value.success.user_data.icon.image_uuid, value.success.user_data.icon.token).then((value1) => {
          if (value1.error) {
            console.error(`${value1.error.error_id}: ${value1.error.message}`);
          }
          setUser({
            user_id: value.success.user_data.user_id,
            name: value.success.user_data.name,
            screen_id: value.success.user_data.screen_id,
            icon: value1.success || null, // iconが取得できなかった場合はnullを設定
          });
        });
      } else {
        setUser({
          user_id: value.success.user_data.user_id,
          name: value.success.user_data.name,
          screen_id: value.success.user_data.screen_id,
          icon: null,
        });
      }
    });
  }, [creator_id]);

  return [creatordata, user, err];
}
