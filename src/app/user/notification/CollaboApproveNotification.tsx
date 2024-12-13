import {CollaboApproveData} from "@/user/notification/NotificationRes";
import {useState} from "react";
import {ErrorData} from "../../../util/err/err";
import {ErrorMessage} from "../../../util/err/ErrorMessage";

export default function CollaboApproveNotification(
  {
    collaboApprove,
  }: {
    collaboApprove: CollaboApproveData
  },
) {
  const [err, setErr] = useState<ErrorData>()
  return (
    <div>
      <p>data</p>
      <p>approve: {collaboApprove.approve_id}</p>
      <p>collabo: {collaboApprove.collabo_id}</p>
      <ErrorMessage error={err}/>
    </div>
  )
}
