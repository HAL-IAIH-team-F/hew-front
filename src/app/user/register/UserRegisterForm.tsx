"use client";
import { StyledForm } from "../../../util/form/StyledForm";
import { StyledInput } from "../../../util/form/StyledInput";
import { StyledButton } from "../../../util/form/StyledButton";
import { ChangeEvent, useState } from "react";

export default function UserRegisterForm({ ...props }: UserRegisterFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState<string>("no");
  const [iconFile, setIconFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file); 
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
  
    if (iconFile) {
      formData.append("icon", iconFile);
    }
    console.log("FormDataの内容:");
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (value instanceof File) {
        console.log(`${key}:`, value.name);  
      } else {
        console.log(`${key}:`, value);  
      }
    });
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "登録に失敗しました");
      }
      console.log("登録に成功しました");
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit} {...props}>
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
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      <StyledInput name="表示名" type="text"/>

      <div className="flex items-center space-x-10 mb-4">
        <label htmlFor="register_creator" className="mr-4">
          クリエイターとして登録
        </label>
        <div className="flex items-center space-x-6">
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
        <StyledButton type="submit">登録</StyledButton>
      </div>
    </StyledForm>
  );
}

export interface UserRegisterFormProps {}
