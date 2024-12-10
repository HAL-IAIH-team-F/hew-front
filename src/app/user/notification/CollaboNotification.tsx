import {CollaboData} from "@/user/notification/NotificationRes";
import {apiClient} from "~/api/wrapper";
import {useSession} from "next-auth/react";
import {useClientContext} from "~/api/useClientContext";
import {useState} from "react";
import {ErrorData} from "../../../util/err/err";
import {ErrorMessage} from "../../../util/err/ErrorMessage";

export default function CollaboNotification(
  {
    collabo,
  }: {
    collabo: CollaboData
  },
) {
  const [err, setErr] = useState<ErrorData>()
  const session = useSession()
  const clientContext = useClientContext(session)
  const [disabled, setDisabled] = useState(false)

  return (
    <div>
      <p>data</p>
      <p>sender: {collabo.sender_creator_id}</p>
      <button onClick={() => {
        setErr(undefined)
        setDisabled(true)
        clientContext.execBody(apiClient.pca_api_colab_approve_post, {collabo_id: collabo.sender_creator_id})
          .then(value => {
            setDisabled(false)
            if (!value.error) return
            setErr(value.error)
          })
      }}
              className={"border-2 border-gray-300 p-1 hover:bg-gray-200"}
              disabled={disabled}
      >
        approve
      </button>
      <ErrorMessage error={err}/>
    </div>
  )
}
