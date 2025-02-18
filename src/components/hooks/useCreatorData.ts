"use client"
import {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";

import {Api, Img} from "~/api/context/Api";
import {ErrorData} from "../../util/err/err";
import {CreatorRes} from "~/res/reses";

export interface UseCreatorDataUserInfo {
  user_id: string;
  name: string;
  screen_id: string;
  icon: Img | null;
}


export default function useCreatorData(creator_id: string):
    [CreatorRes | undefined, UseCreatorDataUserInfo | undefined, ErrorData | undefined] {
  const [user, setUser] = useState<UseCreatorDataUserInfo | undefined>();
  const [err, setErr] = useState<ErrorData | undefined>();
  const client = useClientState();
  const [creatorRes, setCreatorRes] = useState<CreatorRes>()
  useEffect(() => {
    client.client.unAuth(Api.app.getcre_api_creator__creator_id__get, {}, {creator_id: creator_id}).then(value => {
      if (value.error) {
        setErr(value.error);
        return;
      }
      setCreatorRes(value.success);

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

  // return useMemo(() => {
  //
  //   return [creatordata, user, err];
  // }, []);
  return [creatorRes, user, err]
}
