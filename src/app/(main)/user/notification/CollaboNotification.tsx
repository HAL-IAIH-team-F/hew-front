import {CollaboData} from "@/(main)/user/notification/NotificationRes";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {useState} from "react";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import {Api} from "~/api/context/Api";

export default function CollaboNotification(
  {
    collabo,
  }: {
    collabo: CollaboData
  },
) {
  const [err, setErr] = useState<ErrorData>()
  const clientContext = useClientContextState()
  const [disabled, setDisabled] = useState(false)

  return (
    <div>
      <p>data</p>
      <p>collabo: {collabo.collabo_id}</p>
      <p>sender: {collabo.sender_creator_id}</p>
      <button onClick={() => {
        setErr(undefined)
        setDisabled(true)
        if (clientContext.state != "authenticated") throw new Error("not authenticated")
        clientContext.client.authBody(Api.app.pca_api_colab_approve_post, {collabo_id: collabo.collabo_id})
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
