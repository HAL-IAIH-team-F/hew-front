import {useEffect, useState} from 'react';
import {Api, Img} from './Api';
import {ErrorIds} from '../../../util/err/errorIds';
import {useClientContextState} from './ClientContextProvider';

export const useUserData = () => {
  const [user, setUser] = useState<{ id: string; name: string; icon: Img | undefined }>();
  const context = useClientContextState();

  useEffect(() => {
    if (context.state == "authenticated") {
      context.client.auth(
        Api.app.get_user_api_user_self_get, {}, {}
      ).then((value) => {
        if (!value.success) {
          setUser(undefined);
          if (ErrorIds.USER_NOT_FOUND.equals(value.error?.error_id)) return;
          console.error("get self error", value.error);
          return;
        }
        if (value.success.user_icon) {
          Img.create(value.success.user_icon.image_uuid, value.success.user_icon.token).then((value1) => {
            setUser({
              id: value.success.user_screen_id,
              name: value.success.user_name,
              icon: value1.success,
            });
            if (value1.error) {
              console.error(`${value1.error.error_id}: ${value1.error.message}`);
            }
          });
        } else {
          setUser({
            id: value.success.user_screen_id,
            name: value.success.user_name,
            icon: undefined,
          });
        }
      });
    } else {
      setUser(undefined);
    }
  }, [context, context.state]);
  return {user};
};
