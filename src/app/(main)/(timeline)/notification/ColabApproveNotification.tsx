import { useEffect } from "react";
import { ColabApproveData } from "@/(main)/(timeline)/notification/NotificationRes";
import NotificationBase from "./NotificationBase";
import CreatorIconCard from "~/Icon/CreatorIconCard";

export default function ColabApproveNotification({ request }: { request: ColabApproveData }) {
  useEffect(() => {
    
    console.log(`コラボID: ${request.collabo_id} は承認済みになりました`);
  }, [request.collabo_id]);

  return (
    <NotificationBase title="コラボが承認されました">
      <CreatorIconCard creator_id={request.colab_creator_id} />
      <p className="text-gray-300">承認者ID: {request.colab_creator_id}</p>
      <p className="text-gray-300">コラボID: {request.collabo_id}</p>
      <p className="text-gray-300">承認ID: {request.collabo_approve_id}</p>
    </NotificationBase>
  );
}
