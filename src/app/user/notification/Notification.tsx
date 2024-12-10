import {NotificationRes} from "@/user/notification/NotificationRes";
import {ReactNode} from "react";
import CollaboNotification from "@/user/notification/CollaboNotification";

export default function Notification(
  {
    notification,
  }: {
    notification: NotificationRes
  },
) {
  let node: ReactNode = undefined

  switch (notification.data.notification_type) {
    case "colab":
      node = <CollaboNotification collabo={notification.data}/>
  }

  return (
    <div className={"border-2"} key={notification.notification_id}>
      <p>id: {notification.notification_id}</p>
      <p>type: {notification.data.notification_type}</p>
      {node}
    </div>
  )
}
