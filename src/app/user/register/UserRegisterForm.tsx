"use client";
import { StyledForm } from "../../../util/form/StyledForm";
import { StyledInput } from "../../../util/form/StyledInput";
import { StyledButton } from "../../../util/form/StyledButton";
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
      <div className="flex items-center space-x-4 mb-4">
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
          <input
            name="icon"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
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
      <StyledInput name="表示名" type="text" />

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

export interface UserRegisterFormProps {}
