import { useState } from "react";
import { Api } from "~/api/context/Api";
import { useClientState } from "~/api/context/ClientContextProvider";

export default function CollaborationButton() {
  const [messageSent, setMessageSent] = useState(false);
  const clientState = useClientState()
  
  const handleClick = () => {
    // if (clientState.state !== "registered") return
    // clientState.client.auth(Api.app.pcr_api_colab_request_post, {}, {}).then(value => {
    //   if (value.error) {
    //     console.error(value.error)
    //     return
    //   }
    // })
    // setMessageSent(true);
  };

  return (
    <div className="flex justify-center pb-3">
      <button
        className={`px-10 py-1 rounded-lg text-white bg-gray-700 ${messageSent ? "" : "hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"} font-medium`}
        onClick={handleClick}
        disabled={messageSent} // 送信済みの場合はクリックも無効化
      >
        {messageSent ? "送信済み" : "「 コラボしたい 」を送る"}
      </button>
    </div>
  );
}
