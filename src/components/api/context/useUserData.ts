"use client"
import {useEffect, useState} from 'react';
import {Api, Img} from './Api';
import {ErrorIds} from '../../../util/err/errorIds';
import {useClientState} from './ClientContextProvider';
import {RegisteredClientState} from "~/api/context/ClientState";

export interface UserData {
  id: string;
  name: string;
  icon: Img | undefined 
  creator_data: {
    creator_id: string,
    contact_address: string
  } | undefined | null
}

export function useUserData(userId: string | undefined = undefined) {
  const [user, setUser] = useState<UserData>();
  const context = useClientState();

  useEffect(() => {
    if (context.state != "registered") {
      setUser(undefined);
      return
    }
    fetchUserData(userId, context).then(value => setUser(value));
  }, [context, context.state]);
  return {user};
}

async function fetchUserData(userId: string | undefined, context: RegisteredClientState): Promise<UserData | undefined> {
  const user = await fetchUser(userId, context);
  if (!user) return undefined;
  if (user.icon) {
    const imgResult = await Img.create(user.icon.image_uuid, user.icon.token);
    if (imgResult.error) {
      // console.error(${imgResult.error.error_id}: ${imgResult.error.message});
      return undefined
    }
    return {
      id: user.screen_id,
      name: user.name,
      icon: imgResult.success,
      creator_data: user.creator_data
    }

  }
  return {
    id: user.screen_id,
    name: user.name,
    icon: undefined,
    creator_data: user.creator_data
  }
}

async function fetchUser(userId: string | undefined, context: RegisteredClientState) {
  if (userId == undefined) return context.user
  if (context.user.user_id == userId) return context.user
  const result = await context.client.auth(
      Api.app.get_user____api_user__user_id__get, {}, {user_id: userId}
  )
  if (!result.success) {
    if (ErrorIds.USER_NOT_FOUND.equals(result.error?.error_id)) return undefined;
    console.error("get self error", result.error);
    return undefined;
  }
  return result.success;
}