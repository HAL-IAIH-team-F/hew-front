"use client"
import {useEffect, useState} from 'react';
import {Api, Img} from './Api';
import {ErrorIds} from '../../../util/err/errorIds';
import {useClientState} from './ClientContextProvider';
import {LoadedClientState} from "~/api/context/ClientState";
import {UserResWithImg} from "~/res/UserRes";

export function useUserData(userId: string | undefined = undefined) {
  const [user, setUser] = useState<UserResWithImg>();
  const context = useClientState();

  useEffect(() => {
    console.debug("useUserData", context.state)
    if (context.state == "loading") {
      setUser(undefined);
      return
    }
    if (userId == undefined) {
      if (context.state != "registered") {
        console.debug("useUserData userId is undefined but state is not registered")
        return;
      }
      userId = context.user.user_id;
    }
    fetchUserData(userId, context).then(value => setUser(value));
  }, [context, context.state, userId]);
  return user;
}

async function fetchUserData(userId: string, context: LoadedClientState): Promise<UserResWithImg | undefined> {
  const user = await fetchUser(userId, context);
  if (!user) return undefined;
  if (user.icon) {
    const imgResult = await Img.create(user.icon.image_uuid, user.icon.token);
    if (imgResult.error) {
      // console.error(${imgResult.error.error_id}: ${imgResult.error.message});
      return undefined
    }
    return {
      ...user,
      icon: imgResult.success,
    }

  }
  return {
    ...user,
    icon: undefined,
  }
}

async function fetchUser(userId: string, context: LoadedClientState) {
  if (context.state == "registered" && context.user.user_id == userId) return context.user
  const result = await context.client.unAuthOrAuth(
      Api.app.get_user____api_user__user_id__get, {}, {user_id: userId}
  )
  if (!result.success) {
    if (ErrorIds.USER_NOT_FOUND.equals(result.error?.error_id)) return undefined;
    console.error("get self error", result.error);
    return undefined;
  }
  return result.success;
}