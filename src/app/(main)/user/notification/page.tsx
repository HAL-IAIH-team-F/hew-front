"use client"

import {FC, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useClientContext} from "~/api/context/useClientContext";
import {apiClient} from "~/api/context/wrapper";
import {NotificationRes} from "@/(main)/user/notification/NotificationRes";
import Notification from "@/(main)/user/notification/Notification";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

const NotificationPage: FC = () => {
  const session = useSession()
  const clientContext = useClientContext(session)
  const [err, setErr] = useState<ErrorData>()
  const [notifications, setNotifications] = useState<NotificationRes[]>()

  useEffect(() => {
    if (!clientContext.isLogin()) return
    clientContext.exec(apiClient.gns_api_notification_get).then(value => {
      if (value.error) {
        setErr(value.error)
        return
      }
      setNotifications(value.success)
    })
  }, [clientContext.isLogin()]);
  return (
    <div>
      {notifications && notifications.map(value =>
        <Notification key={value.notification_id} notification={value}/>
      )}
      <ErrorMessage error={err}/>
    </div>
  );
};

export default NotificationPage;