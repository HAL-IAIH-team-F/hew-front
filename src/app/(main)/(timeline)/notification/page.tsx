"use client"
import React, {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ErrorData} from "../../../../util/err/err";
import {NotificationRes} from "@/(main)/(timeline)/notification/NotificationRes";
import {Api} from "~/api/context/Api";
import Notification from "@/(main)/(timeline)/notification/Notification";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import { Search } from "lucide-react";
import { FaBell } from "react-icons/fa";
import LoginNeed from "~/UI/loginNeed";

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
  if (clientContext.state !== "registered") {
        return (
            <div>
              <LoginNeed/>
            </div>
        )
    }
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="top-0 left-0 w-full bg-gray-900 text-gray-100 px-7 py-5 flex items-center gap-2 shadow-md">
        <FaBell className="w-8 h-8" />
        <span className="text-3xl font-bold">通知</span>
      </div>



      {/* Notifications Section */}
      <div className="overflow-y-scroll max-h-screen px-4 py-6" style={{
            height: "calc(100vh - 0px)",
            maxHeight: "calc(100vh - 200px)",
            boxSizing: "border-box",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
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