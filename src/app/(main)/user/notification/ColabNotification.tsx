import {ColabData} from "@/(main)/user/notification/NotificationRes";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";

export default function ColabNotification(
  {
    colab,
  }: {
    colab: ColabData,
  },
) {
  const clientContext = useClientContextState()

  return (
    <div>
      <p>data</p>
      <p>colab: {colab.collabo_id}</p>
      <p>title: {colab.title}</p>
      <p>description: {colab.description}</p>
      <p>owner: {colab.owner_id}</p>
      <div>creators: {colab.creator_ids.map(value =>
        <p key={value}>creator: {value}</p>
      )}</div>
      <button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md"
        disabled={clientContext.state != "authenticated"}
        onClick={() => {
          if (clientContext.state != "authenticated") throw new Error("not authenticated")
          clientContext.client.authBody(
            Api.app.pca_api_colab_approve_post, {}, {colab_id: colab.collabo_id}, {}
          ).then(value => {
            if (value.error) return console.error(value.error)
          })
        }}
      >accept
      </button>
    </div>
  )
}
