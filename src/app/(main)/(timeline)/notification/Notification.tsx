import {
  ColabApproveData,
  ColabData,
  ColabRequestData,
  NotificationRes
} from "@/(main)/(timeline)/notification/NotificationRes";
import ColabRequestNotification from "@/(main)/(timeline)/notification/ColabRequestNotification";
import ColabNotification from "@/(main)/(timeline)/notification/ColabNotification";
import ColabApproveNotification from "@/(main)/(timeline)/notification/ColabApproveNotification";

export default function Notification({ notification }: { notification: NotificationRes }) {
  let node;

  switch (notification.data.notification_type) {
    case "colab_request":
      node = <ColabRequestNotification request={notification.data as ColabRequestData} />;
      break;
    case "colab_approve":
      // node = <ColabApproveNotification request={notification.data as ColabApproveData} />;
      break;
    case "colab":
      node = <ColabNotification colab={notification.data as ColabData} />;
      break;
  }

  return <div key={notification.notification_id}>{node}</div>;
}
