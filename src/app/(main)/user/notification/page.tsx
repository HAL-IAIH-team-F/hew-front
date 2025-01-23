"use client"

import {FC, useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {NotificationRes} from "@/(main)/user/notification/NotificationRes";
import Notification from "@/(main)/user/notification/Notification";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import {Api} from "~/api/context/Api";

const NotificationPage: FC = () => {
  const clientContext = useClientState()
  const [err, setErr] = useState<ErrorData>()
  const [notifications, setNotifications] = useState<NotificationRes[]>()

  useEffect(() => {
    if (clientContext.state != "registered") return
    clientContext.client.auth(Api.app.gns_api_notification_get, {}, {}).then(value => {
      if (value.error) {
        setErr(value.error)
        return
      }
      setNotifications(value.success)
    })
  }, [clientContext.state]);
  return (
    <div className={"overflow-y-scroll h-full"}>
      {notifications && notifications.map(value =>
        <Notification key={value.notification_id} notification={value}/>
      )}
      <ErrorMessage error={err}/>
    </div>
  );
};

export default NotificationPage;