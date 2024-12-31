import {ColabData} from "@/(main)/user/notification/NotificationRes";

export default function ColabNotification(
  {
    colab,
  }: {
    colab: ColabData,
  },
) {


  return (
    <div>
      <p>data</p>
      <p>colab: {colab.collabo_id}</p>
      <p>title: {colab.title}</p>
      <p>description: {colab.description}</p>
      <p>owner: {colab.owner_id}</p>
      <div>creators: {colab.creator_ids.map(value =>
        <p key={value}>creator: {value}</p>
      )}</div>
    </div>
  )
}
