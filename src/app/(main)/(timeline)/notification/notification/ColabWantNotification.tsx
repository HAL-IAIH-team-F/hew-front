import { ColabWantData } from "@/(main)/(timeline)/notification/notification/NotificationRes";
import { CreatorCard } from "~/products/ProfileProductsView";

export default function ColabWantNotification(
    {
      request,
    }: {
      request: ColabWantData;
    }
) {
  return (
      <div className="">
        <h3 className="text-lg font-semibold text-white mb-4">コラボの要望</h3>

        <div className="text-sm text-gray-300">
          <p>このクリエイターが「コラボしたい」と言っています:</p>
        </div>

        <div className="mt-4">
          {/* CreatorCard の表示 */}
          <CreatorCard creator_id={request.from_creator_id} />
        </div>

        <div className="mt-6 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
            コラボする
          </button>
        </div>
      </div>
  );
}