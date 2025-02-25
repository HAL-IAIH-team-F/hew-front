import {ColabData} from "@/(main)/(timeline)/notification/NotificationRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import CreatorIconCard from "~/Icon/CreatorIconCard";

export default function ColabNotification(
    {
      colab,
    }: {
      colab: ColabData,
    },
) {
  const clientContext = useClientState()

  return (
      <div>
        <div className="">
          <h3 className="text-lg font-semibold text-white mb-4">コラボの要望</h3>

          <div className="text-sm text-gray-300">
            <p>このクリエイターが「コラボしたい」と言っています:</p>
          </div>

          <div className="mt-4">
            {/* CreatorCard の表示 */}
            <CreatorIconCard creator_id={colab.owner_id}/>
          </div>

          <div className="mt-6 text-right">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                    onClick={() => {
                      if (clientContext.state != "registered") // Throw error when user state is invalid
                        throw new Error("not authenticated")
                      clientContext.client.authBody(
                          Api.app.pca_api_colab_approve_post, {}, {colab_id: colab.collabo_id}, {} // API call to approve the request
                      ).then(value => {
                        if (value.error) return console.error(value.error) // Log any errors
                      })
                    }}
            >
              コラボする
            </button>
          </div>
        </div>
      </div>
  )
}
