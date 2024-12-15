"use client"

import {FC, useEffect, useState} from "react";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {apiClient} from "~/api/context/wrapper";
import {NotificationRes} from "@/(main)/user/notification/NotificationRes";
import Notification from "@/(main)/user/notification/Notification";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

const NotificationPage: FC = () => {
  const clientContext = useClientContextState()
  const [err, setErr] = useState<ErrorData>()
  const [notifications, setNotifications] = useState<NotificationRes[]>()

  useEffect(() => {
    if (clientContext.state != "authenticated") return
    clientContext.context.exec(apiClient.gns_api_notification_get).then(value => {
      if (value.error) {
        setErr(value.error)
        return
      }
      setNotifications(value.success)
    })
  }, [clientContext.state]);
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