import {ColabData, ColabRequestData, NotificationRes} from "@/(main)/user/notification/NotificationRes";
import {ReactNode} from "react";
import ColabRequestNotification from "@/(main)/user/notification/ColabRequestNotification";
import ColabNotification from "@/(main)/user/notification/ColabNotification";

export default function Notification(
  {
    notification,
  }: {
    notification: NotificationRes
  },
) {
  let node: ReactNode = undefined

  switch (notification.data.notification_type) {
    case "colab_request":
      node = <ColabRequestNotification request={notification.data as ColabRequestData}/>
      break
    case "colab":
      node = <ColabNotification colab={notification.data as ColabData}/>
      break
  }

  return (
    <div className={"border-2"} key={notification.notification_id}>
      <p>id: {notification.notification_id}</p>
      <p>type: {notification.data.notification_type}</p>
      {node}
    </div>
  )
}
