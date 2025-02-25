import React, {useState} from "react";
import {UserDataWithImg} from "~/res/reses";

export function IconCard(
    {
      userData,
    }: {
      userData: UserDataWithImg | undefined
    }
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // console.debug("CreatorCard", iconUrl, screenId, name, loading, error)
  return (
      <div className="w-60 p-1 rounded-lg bg-gray-900">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center">
            {userData?.icon?.strUrl() && !error ? (
                <img
                    src={userData.icon?.strUrl()}
                    alt={userData.name || "User Icon"}
                    className="w-full h-full object-cover"
                    onLoad={() => setLoading(false)}
                    onError={() => {
                      setLoading(false);
                      setError(true);
                    }}
                />
            ) : loading || error ? (
                // くるくるスピナー
                <div
                    className="animate-spin rounded-full h-6 w-6 border-t-2 border-gray-500 dark:border-gray-400"></div>
            ) : (
                // デフォルトのアイコン
                <div className="w-6 h-6 text-gray-400">
                  <div className="w-full h-full rounded-full border-2 border-gray-400 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full border-2 border-gray-400 -mt-1"/>
                  </div>
                </div>
            )}
          </div>

          <div className="flex flex-col">
            {userData?.name && (
                <h3 className="font-medium text-lg text-white">
                  {userData.name}
                </h3>
            )}
            {userData?.screen_id && (
                <p className="text-sm text-gray-400">
                  @{userData.screen_id}
                </p>
            )}
          </div>

        </div>
      </div>
  );
}