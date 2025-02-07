import {ColabApproveData} from "@/(main)/(timeline)/user/notification/NotificationRes";

export default function ColabApproveNotification(
  {
    request,
  }: {
    request: ColabApproveData
  },
) {
  return (
    <div>
      <p>data</p>
      <p>colab_creator_id: {request.colab_creator_id}</p>
      <p>colab_approve_id: {request.collabo_approve_id}</p>
      <p>colab_id: {request.collabo_id}</p>
    </div>
  )
}
