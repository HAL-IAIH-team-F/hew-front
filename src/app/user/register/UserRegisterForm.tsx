"use client";
import { StyledForm } from "../../../util/form/StyledForm";
import { StyledInput } from "../../../util/form/StyledInput";
import { StyledButton } from "../../../util/form/StyledButton";
import FlexBox from "../../../util/FlexBox";
import { ChangeEvent, useState } from "react";

export default function UserRegisterForm({ ...props }: UserRegisterFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState<string>("no");

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

  return (
    <StyledForm {...props}>
      {/* アイコンと変更ボタンを横並びに配置 */}
      <div className="flex items-center space-x-4 mb-4">
        {/* 画像部分をクリックしてもファイル選択ダイアログを開く */}
        <label className="relative cursor-pointer">
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
          {/* 隠しファイル入力 */}
          <input
            name="icon"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </label>

        {/* 変更ボタン */}
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

      <StyledInput name="メールアドレス" type="text" />
      <StyledInput name="パスワード" type="text" />
      <StyledInput name="ユーザーネーム" type="text" />
      <StyledInput name="表示名" type="text" />

      {/* クリエイターとして登録のラジオボタン */}
      <div className="flex items-center space-x-2 mb-4">
        <label htmlFor="register_creator">クリエイターとして登録</label>
        <div className="flex items-center space-x-2">
          <label>
            <input
              type="radio"
              name="creator"
              value="yes"
              checked={isCreator === "yes"}
              onChange={handleCreatorChange}
            />
            はい
          </label>
          <label>
            <input
              type="radio"
              name="creator"
              value="no"
              checked={isCreator === "no"}
              onChange={handleCreatorChange}
            />
            いいえ
          </label>
        </div>
      </div>

      {/* ボタンを右側に配置する */}
      <div className="flex justify-end">
        <StyledButton>登録</StyledButton>
      </div>
    </StyledForm>
  );
}

export interface UserRegisterFormProps {}
