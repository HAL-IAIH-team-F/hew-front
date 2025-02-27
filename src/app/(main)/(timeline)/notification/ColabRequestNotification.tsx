import { ColabRequestData } from "@/(main)/(timeline)/notification/NotificationRes";
import NotificationBase from "./NotificationBase";
import CreatorIconCard from "~/Icon/CreatorIconCard";

export default function ColabRequestNotification({ request }: { request: ColabRequestData }) {
  return (
    <NotificationBase title="コラボリクエストが届きました">
      <p className="text-gray-300">リクエストID: {request.colab_request_id}</p>
      <CreatorIconCard creator_id={request.from_creator_id} />
      <p className="text-gray-300">承認者ID: {request.from_creator_id}</p>
    </NotificationBase>
  );
}
