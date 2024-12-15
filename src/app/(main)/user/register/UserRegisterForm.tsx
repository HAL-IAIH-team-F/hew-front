"use client";
import {ChangeEvent, useState} from "react";
import {apiClient} from "~/api/context/wrapper";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {useRouter} from 'next/navigation';
import {StyledForm} from "../../../../util/form/StyledForm";
import {StyledInput} from "../../../../util/form/StyledInput";
import {StyledButton} from "../../../../util/form/StyledButton";

export default function UserRegisterForm({...props}: UserRegisterFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState<string>("no");
  const router = useRouter()
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCreator(e.target.value);
  };

  const clientContext = useClientContextState()

  return (
    <StyledForm {...props} action={async formData => {
      const icon_file = formData.get("icon") as File | undefined;
      const user_name = formData.get("user_name");

      if (typeof user_name !== 'string' || !user_name) {
        formData.append("user_name", "ユーザーネームを入力してください");
        return   // エラーがあればここで処理を終了
      }
      let iconUuid: string | null = null
      if (icon_file) {
        const imgResult = await clientContext.context.uploadImg(icon_file)
        if (imgResult.error) {
          formData.append("icon", imgResult.error.error_id + ": " + imgResult.error.message);
          return
        }
        iconUuid = imgResult.success.image_uuid
      }

      const postUserResult = await clientContext.context.execBody(
        apiClient.post_user_api_user_post,
        {user_name: user_name, user_icon_uuid: iconUuid}
      )
      if (postUserResult.error) {
        formData.append("icon", postUserResult.error.error_id + ": " + postUserResult.error.message);
        return
      }
      router.push('/timeline');
      return undefined

    }}>
      <div className="flex items-center space-x-4 mb-4">
        <label className="relative cursor-pointer" htmlFor={"icon-upload"}>
          <div className="w-[150px] h-[150px] overflow-hidden rounded-full bg-gray-200">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="プレビュー"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  className="w-full h-full"
                  src="/curtain.png"
                  alt="デフォルトアイコン"
                />
              </div>
            )}
          </div>
        </label>

        <label htmlFor="icon-upload" className="cursor-pointer">
          <div className="rounded-full px-4 py-2 bg-white border-2 border-borderDef hover:bg-lightGray text-center">
            変更
          </div>
        </label>
        <input
          id="icon-upload"
          name="icon"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      <StyledInput name="user_name" label="ユーザーネーム" type="text"/>

      {/* クリエイターとして登録のラジオボタン */}
      <div className="flex items-center space-x-10 mb-4"> {/* 隙間を開ける */}
        <label htmlFor="register_creator" className="mr-4"> {/* ラベルとの隙間 */}
          クリエイターとして登録
        </label>
        <div className="flex items-center space-x-6"> {/* ラジオボタン間の隙間 */}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="creator"
              value="yes"
              checked={isCreator === "yes"}
              onChange={handleCreatorChange}
            />
            <span>はい</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="creator"
              value="no"
              checked={isCreator === "no"}
              onChange={handleCreatorChange}
            />
            <span>いいえ</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <StyledButton>登録</StyledButton>
      </div>
    </StyledForm>
  );
}

export interface UserRegisterFormProps {
}
