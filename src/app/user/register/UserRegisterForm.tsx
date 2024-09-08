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
            <label className="relative w-fit block">
                <div className="w-[150px] h-[150px] overflow-hidden rounded-full bg-gray-200">
                    {imagePreview ? (
                        <img src={imagePreview} alt="プレビュー" className="w-full h-full object-cover"/>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <img className={"w-full h-full"} src={"/curtain.png"}/>
                        </div>
                    )}
                </div>
                <div className={"rounded-3xl w-20 mx-auto py-1 hover:bg-lightGray mt-2 bg-white border-2 border-borderDef text-center"}>変更</div>
                <input name={"icon"}
                       type="file"
                       onChange={handleImageChange}
                       accept="image/*"
                       className="invisible h-0 w-0 fixed"
                />
            </label>
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
