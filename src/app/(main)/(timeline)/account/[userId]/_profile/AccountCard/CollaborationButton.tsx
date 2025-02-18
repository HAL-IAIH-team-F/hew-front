import {useState} from "react";
import {Api} from "~/api/context/Api";
import {useClientState} from "~/api/context/ClientContextProvider";

export default function CollaborationButton(
    {
      creatorId,
    }: {
      creatorId: string | undefined,
    }
) {
  const [messageSent, setMessageSent] = useState(false);
  const clientState = useClientState()

  const handleClick = () => {
    if (clientState.state !== "registered") return
    if (creatorId == undefined) return
    clientState.client.authBody(Api.app.post_colab_want___api_colab_want_post, {}, {
      target_creator_id: creatorId,
    }, {}).then(value => {
      console.debug(value)
      if (value.error) {
        console.error(value.error)
        setMessageSent(false);
        return
      }
    }).catch(console.error)
    setMessageSent(true);
  };

  return (
      <div className="flex justify-center pb-3">
        <button
            className={`px-10 py-1 rounded-lg text-white bg-gray-700 ${messageSent || creatorId == undefined ? "" : "hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"} font-medium`}
            onClick={handleClick}
            disabled={messageSent || creatorId == undefined} // 送信済みの場合はクリックも無効化
        >
          {messageSent ? "送信済み" : "「 コラボしたい 」を送る"}
        </button>
      </div>
  );
}
