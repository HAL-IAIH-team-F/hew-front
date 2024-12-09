import {NotificationRes} from "@/user/notification/NotificationRes";
import {ReactNode} from "react";
import CollaboNotification from "@/user/notification/CollaboNotification";
import CollaboApproveNotification from "@/user/notification/CollaboApproveNotification";

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
      break
    case "colab_approve":
      node = <CollaboApproveNotification collaboApprove={notification.data}/>
      break;
  }

  return (
    <div className={"border-2"} key={notification.notification_id}>
      <p>id: {notification.notification_id}</p>
      <p>type: {notification.data.notification_type}</p>
      {node}
    </div>
  )
}
