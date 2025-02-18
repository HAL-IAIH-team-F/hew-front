import {ColabRequestData} from "@/(main)/(timeline)/notification/notification/NotificationRes";

export default function ColabRequestNotification(
  {
    request,
  }: {
    request: ColabRequestData
  },
) {
  return (
    <div>
      <p>data</p>
      <p>request: {request.colab_request_id}</p>
      <p>from: {request.from_creator_id}</p>
    </div>
  )
}
