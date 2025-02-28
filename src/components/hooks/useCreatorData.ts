"use client"
import {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";

import {Api, Img} from "~/api/context/Api";
import {ErrorData} from "../../util/err/err";
import {CreatorRes} from "~/res/reses";
import {UserDataWithImg} from "~/res/UserRes";


export default function useCreatorData(creator_id: string):
    [CreatorRes | undefined, UserDataWithImg | undefined, ErrorData | undefined] {
  const [user, setUser] = useState<UserDataWithImg | undefined>();
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
            ...value.success.user_data,
            icon: value1.success || undefined, // iconが取得できなかった場合はnullを設定
          });
        });
      } else {
        setUser({
          ...value.success.user_data,
          icon: undefined,
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
