import {IconCard} from "~/Icon/IconCard";
import {useUserData} from "~/api/context/useUserData";

export default function UserIconCard(
    {
      userId
    }: {
      userId: string,
    },
) {
  const user = useUserData(userId)

  return (
      <IconCard userData={user}/>
  )
}
