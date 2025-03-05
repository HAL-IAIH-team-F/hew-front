import {IconCard} from "~/Icon/IconCard";
import useCreatorData from "~/hooks/useCreatorData";
import {useEffect} from "react";
import useRoutes from "~/route/useRoutes";

export default function CreatorIconCard(
    {
      creator_id,
      onDataFetched,
      isTransition = true,
    }: {
      creator_id: string,
      showView?: boolean,
      onDataFetched?: (data: { iconUrl: string | null; screenId?: string }) => void,
      isTransition?: boolean
    },
) {
  const [_, user_data, __] = useCreatorData(creator_id);
  const iconUrl = user_data?.icon ? user_data.icon.strUrl() : null;
  const screenId = user_data?.screen_id;
  const routes = useRoutes();
  useEffect(() => {
    if (onDataFetched) {
      onDataFetched({iconUrl, screenId});
    }
  }, [iconUrl, screenId, onDataFetched]);
  return (
      <div
          onClick={(event) =>
              isTransition && routes.account.account(user_data?.user_id).transition(event)
      }
      >
        <IconCard userData={user_data}/>
      </div>
  )
}
