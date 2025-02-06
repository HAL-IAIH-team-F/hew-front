import {ColabData} from "@/(main)/user/notification/NotificationRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";

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
            {/* Display basic information about the collaboration */}
            <p>data</p>
            <p>colab: {colab.collabo_id}</p>
            <p>title: {colab.title}</p>
            <p>description: {colab.description}</p>
            <p>owner: {colab.owner_id}</p>
            {/* Map through the list of creator IDs and render them */}
            <div>creators: {colab.creator_ids.map(value =>
                <p key={value}>creator: {value}</p>
            )}</div>
            {/* "Accept" button to approve the collaboration request */}
            <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md"
                disabled={clientContext.state != "registered"} // Disable if user is not registered
                onClick={() => {
                    if (clientContext.state != "registered") // Throw error when user state is invalid
                        throw new Error("not authenticated")
                    clientContext.client.authBody(
                        Api.app.pca_api_colab_approve_post, {}, {colab_id: colab.collabo_id}, {} // API call to approve the request
                    ).then(value => {
                        if (value.error) return console.error(value.error) // Log any errors
                    })
                }}
            >accept
            </button>
        </div>
    )
}
