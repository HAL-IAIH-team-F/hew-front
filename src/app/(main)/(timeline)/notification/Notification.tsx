import {
  ColabApproveData,
  ColabData,
  ColabRequestData,
  NotificationRes
} from "@/(main)/(timeline)/notification/NotificationRes";
import {ReactNode} from "react";
import ColabRequestNotification from "@/(main)/(timeline)/notification/ColabRequestNotification";
import ColabNotification from "@/(main)/(timeline)/notification/ColabNotification";
import ColabApproveNotification from "@/(main)/(timeline)/notification/ColabApproveNotification";

export default function Notification(
    {
      notification,
    }: {
      notification: NotificationRes
    },
) {
  let node: ReactNode = undefined;

  switch (notification.data.notification_type) {
    case "colab_request":
      node = <ColabRequestNotification request={notification.data as ColabRequestData}/>;
      break;
    case "colab_approve":
      node = <ColabApproveNotification request={notification.data as ColabApproveData}/>;
      break;
    case "colab":
      node = <ColabNotification colab={notification.data as ColabData}/>;
      break;
  }

  return (
      <div key={notification.notification_id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700/50">
        <div className="flex items-center gap-4">
          {/* Notification Details */}
          <div className="flex-grow">
            <div className="mt-4">
              {node}
            </div>
            <div className="text-sm text-gray-400 mb-2">
              Type: {notification.data.notification_type}
            </div>
          </div>
        </div>
      </div>
  );
}
