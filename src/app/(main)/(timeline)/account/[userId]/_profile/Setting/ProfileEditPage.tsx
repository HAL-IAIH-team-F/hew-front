"use client"
import { useClientState } from "~/api/context/ClientContextProvider"
import { Api } from "~/api/context/Api"
import { useEffect, useState } from "react"
import { RegisteredClientState } from "~/api/context/ClientState";
import { ErrorMessage } from "../../../../../../../util/err/ErrorMessage";
import LoginNeed from "~/UI/loginNeed";

export default function ProfileEditPage() {
  const clientState = useClientState()
  const [err, setErr] = useState<string>()
  const [name, setName] = useState<string>("")
  const [icon, setIcon] = useState<File | undefined>()
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (clientState.state !== "registered") return
    setName(clientState.user.name)
  }, [clientState.state])

  if (clientState.state !== "registered") {
    return (
        <div>
          <LoginNeed/>
        </div>
    )
  }

  const handleIconUpload = (event: React.FormEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (files && files.length > 0) {
      setIcon(files[0])
    }
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      await putUser(clientState, icon, name, setErr)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-6 text-gray-100">
        <h2 className="text-xl font-bold mb-4 text-white">設定</h2>

        <div className="space-y-6">
          {err && <ErrorMessage error={err} />}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              ユーザー名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isUpdating}
              placeholder="ユーザー名を入力"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                text-gray-100 placeholder-gray-500
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:bg-gray-900 disabled:text-gray-600
                transition duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              プロフィール画像
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  htmlFor="icon-upload"
                  className="inline-block cursor-pointer px-4 py-2 
                    bg-gray-800 border border-gray-700 rounded-lg
                    text-gray-300 hover:bg-gray-700
                    transition duration-200"
                >
                  画像をアップロード
                </label>
                <input
                  id="icon-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleIconUpload}
                  disabled={isUpdating}
                />
              </div>
              {icon && (
                <span className="text-sm text-gray-400">
                  選択済み: {icon.name}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600
              transition duration-200 font-medium"
          >
            更新
          </button>

          {isUpdating && (
            <div className="bg-blue-900/20 text-blue-400 p-4 rounded-lg border border-blue-900/30
              animate-pulse">
              更新中...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

async function putUser(
  clientState: RegisteredClientState, 
  icon: File | undefined,
  userName: string,
  setErr: (er: string) => void
) {
  let iconUuid: string | null = clientState.user.icon?.image_uuid || null

  if (icon) {
    const imgResult = await clientState.client.uploadImg(icon)
    if (imgResult.error) {
      setErr(imgResult.error.error_id + ": " + imgResult.error.message);
      return
    }
    iconUuid = imgResult.success.image_uuid
  }

  const result = await clientState.client.authBody(Api.app.put_user____api_user_put, {}, {
    user_name: userName,
    user_icon_uuid: iconUuid
  }, {})

  if (result.error) {
    setErr(result.error.error_id + ": " + result.error.message);
    return
  }
  clientState.set({...clientState, user: result.success})
}