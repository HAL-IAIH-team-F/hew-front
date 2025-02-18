"use client"
import React, {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ErrorData} from "../../../../util/err/err";
import {NotificationRes} from "@/(main)/(timeline)/notification/notification/NotificationRes";
import {Api} from "~/api/context/Api";
import Notification from "@/(main)/(timeline)/notification/notification/Notification";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

export default function Page(
    {}: {}
) {
  const clientContext = useClientState();
  const [err, setErr] = useState<ErrorData>();
  const [notifications, setNotifications] = useState<NotificationRes[]>();

  useEffect(() => {
    if (clientContext.state != "registered") return;

    clientContext.client.auth(Api.app.gns_api_notification_get, {}, {}).then(value => {
      if (value.error) {
        setErr(value.error);
        return;
      }
      setNotifications(value.success);
    });
  }, [clientContext.state]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 py-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">通知一覧</h1>
      </div>

      {/* Notifications Section */}
      <div className="overflow-y-scroll max-h-screen px-4 py-6">
        {notifications && notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((value) => (
              <Notification
                key={value.notification_id}
                notification={value}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            通知はありません。
          </div>
        )}
      </div>

      {/* Error Message */}
      {err && (
        <div className="fixed bottom-4 left-4 right-4 p-4 bg-red-800 text-white rounded-lg shadow-md">
          <ErrorMessage error={err} />
        </div>
      )}
    </div>
  );
}