import { useState, useEffect } from "react";
import { ColabData } from "@/(main)/(timeline)/notification/NotificationRes";
import { useClientState } from "~/api/context/ClientContextProvider";
import { Api } from "~/api/context/Api";
import CreatorIconCard from "~/Icon/CreatorIconCard";
import NotificationBase from "./NotificationBase";

export default function ColabNotification({ colab }: { colab: ColabData }) {
  const clientContext = useClientState();
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    // すでに承認されたかどうかを確認
    if (colab.isApproved) {
      setIsApproved(true);
    }
  }, [colab.isApproved]);

  const handleColabApprove = async () => {
    if (clientContext.state !== "registered") {
      alert("認証されていません。ログインしてください。");
      return;
    }

    try {
      const response = await clientContext.client.authBody(
        Api.app.pca_api_colab_approve_post,
        {},
        { colab_id: colab.collabo_id },
        {}
      );
      if (response.error) {
        console.error(response.error);
      } else {
        console.log("コラボが承認されました！");
        setIsApproved(true); // 承認済みにする
      }
    } catch (error) {
      console.error("API呼び出しエラー:", error);
    }
  };

  return (
    <NotificationBase title="コラボの要望" description="このクリエイターが「コラボしたい」と言っています:">
      <CreatorIconCard creator_id={colab.owner_id} />

      <p className="text-gray-300">承認者ID: {colab.owner_id}</p>
      <div className="mt-4 text-center">
        {isApproved ? (
          <button
            className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md 
            transition-all duration-200 cursor-not-allowed border border-gray-500/50"
            disabled
          >
            コラボ済み
          </button>
        ) : (
          <button
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-lg shadow-md 
            transition-all duration-200 hover:bg-gray-500 hover:shadow-lg border border-gray-500/50"
            onClick={handleColabApprove}
          >
            コラボする
          </button>
        )}
      </div>
    </NotificationBase>
  );
}
