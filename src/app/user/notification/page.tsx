"use client"

import {FC, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useClientContext} from "~/api/useClientContext";
import {apiClient} from "~/api/wrapper";
import {ErrorData} from "../../../util/err/err";
import {ErrorMessage} from "../../../util/err/ErrorMessage";
import {NotificationRes} from "@/user/notification/NotificationRes";

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
      setNotifications(value.value)
    })
  }, [clientContext.isLogin()]);
  return (
    <div>
      {notifications && notifications.map(value =>
        <div className={"border-2"} key={value.notification_id}>
          <p>id: {value.notification_id}</p>
          <p>type: {value.notification_type}</p>
          <div>
            <p>data</p>
            <p>sender: {value.data.sender_creator_id}</p>
          </div>
        </div>
      )}
      <ErrorMessage error={err}/>
    </div>
  );
};

export default NotificationPage;