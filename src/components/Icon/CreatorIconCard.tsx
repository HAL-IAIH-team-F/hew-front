import {IconCard} from "~/Icon/IconCard";
import useCreatorData from "~/hooks/useCreatorData";
import {useEffect} from "react";

export default function CreatorIconCard(
    {
      creator_id,
      onDataFetched,
    }: {
      creator_id: string,
      showView?: boolean,
      onDataFetched?: (data: { iconUrl: string | null; screenId?: string }) => void
    },
) {
  const [_, user_data, __] = useCreatorData(creator_id);
  const iconUrl = user_data?.icon ? user_data.icon.strUrl() : null;
  const screenId = user_data?.screen_id;

  useEffect(() => {
    if (onDataFetched) {
      onDataFetched({iconUrl, screenId});
    }
  }, [iconUrl, screenId, onDataFetched]);
  return (
      <IconCard userData={user_data}/>
  )
}
