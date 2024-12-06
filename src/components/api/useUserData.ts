import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { apiClient, Img } from './wrapper';
import { useClientContext } from './useClientContext';
import { ErrorIds } from '../../util/err/errorIds';

export const useUserData = () => {
  const [user, setUser] = useState<{ id:string; name: string; icon: Img | undefined }>();
  const session = useSession();
  const context = useClientContext(session);

  useEffect(() => {
    if (session) {
      context.exec(apiClient.get_user_api_user_self_get, {}).then((value) => {
        if (!value.value) {
          setUser(undefined);
          if (ErrorIds.USER_NOT_FOUND.equals(value.error?.error_id)) return;
          console.error(value.error);
          return;
        }
        if (value.value.user_icon) {
          Img.create(value.value.user_icon.image_uuid, value.value.user_icon.token).then((value1) => {
            setUser({
              id: value.value.user_screen_id,
              name: value.value.user_name,
              icon: value1.value,
            });
            if (value1.error) {
              console.error(`${value1.error.error_id}: ${value1.error.message}`);
            }
          });
        } else {
          setUser({
            id: value.value.user_screen_id,
            name: value.value.user_name,
            icon: undefined,
          });
        }
      });
    } else {
      setUser(undefined);
    }
  }, [context, session]);
  return { user };
};
