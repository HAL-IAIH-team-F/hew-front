"use client"
import {StyledForm} from "../../../util/form/StyledForm";
import {StyledInput} from "../../../util/form/StyledInput";
import {StyledButton} from "../../../util/form/StyledButton";
import FlexBox from "../../../util/FlexBox";
import {ChangeEvent, useState} from "react";

export default function UserRegisterForm(
    {
        ...props
    }: UserRegisterFormProps,
) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);


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

    return (
        <StyledForm {...props}>
            <div className="relative w-[100px] h-[100px]">
                <div className="w-full h-full overflow-hidden rounded-full bg-gray-200">
                    {imagePreview ? (
                        <img src={imagePreview} alt="プレビュー" className="w-full h-full object-cover"/>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            Camera
                        </div>
                    )}
                </div>
                <input name={"icon"}
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
            <StyledInput name={"メールアドレス"} type={"text"}/>
            <StyledInput name={"パスワード"} type={"text"}/>
            <StyledInput name={"ユーザーネーム"} type={"text"}/>
            <StyledInput name={"表示名"} type={"text"}/>
            <StyledInput name={"register_creator"} type={"checkbox"}/>
            <FlexBox className={"justify-end px-10"}>
                <StyledButton>登録</StyledButton>
            </FlexBox>
        </StyledForm>
    )
}

export interface UserRegisterFormProps {
}
