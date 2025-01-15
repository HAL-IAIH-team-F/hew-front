"use client"
import { useState } from "react";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {StyledForm} from "../../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../../util/form/element/StyledInput";
import {StyledButton} from "../../../../../util/form/element/StyledButton";
import {Api} from "~/api/context/Api";

export default function ColabRegisterForm({...props}: ColabRegisterFormProps,) {
  const clientContext = useClientContextState()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // ボタンの有効/無料を判定
    const isButtonDisabled =!title.trim() || !description.trim(); // ボタンの有効/無効判定
    console.log("isButtonDisabled:", isButtonDisabled);

    const handleSubmit = async () => {
        if (isButtonDisabled) {
            setErrors({
                title: title.trim() ? "": "募集タイトルを入力してください",
                description: description.trim() ? "": "募集要項を入力してください",
            });
            return;
        }

        if (!clientContext || clientContext.state !== "authenticated") {
            alert("ログインしてください");
            return;
        }

        try {
            const result = await clientContext.client.authBody(
                Api.app.pr_api_recruit_post,
                {},
                { title, description },
                {}
            );

            if (!result || result.error) {
                const errorMessage = result?.error?.message || "予期しないエラーが発生しました。";
                setErrors({ submit: errorMessage });
                alert(`エラー: ${errorMessage}`);
                return;
            }

            alert("募集投稿が成功しました！")
            setTitle("");
            setDescription("");
            setErrors({});
        } catch (error) {
            console.log("送信中にエラーが発生しました",error);
            setErrors({submit: "送信中にエラーが発生しました"});
            alert("送信中にエラーが発生しました");
        }
    };

  return (
    <StyledForm onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="w-full h-screen bg-ocean-wave bg-[length:200%_200%] animate-wave">
            <div>
                <h1 className="mt-24 mb-44 text-center text-5xl text-white">コラボ募集</h1>
            </div>
            <div className="p-6 mx-auto w-8/12 bg-opacity-100  rounded-2xl">
              <StyledInput
                  name="title"
                  label="募集タイトル"
                  value={title}
                  onChange={(e) =>  {
                      setTitle(e.target.value)
                      if (errors.title) setErrors((prev) => ({...prev, title: ""}));
                  }}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
              <StyledInput
                  name="description"
                  label="募集要項"
                  value={description}
                  onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
                  }}
              />
                {errors.description && <p className="text-red-500">{errors.description}</p>}
              <StyledButton
                  className="mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isButtonDisabled}
                  onClick={handleSubmit}
                >
                  募集する
              </StyledButton>
              {errors.submit && <p className="text-red-500 mt-2">{errors.submit}</p>}
            </div>
        </div>
    </StyledForm>
  );
}
export interface ColabRegisterFormProps {}

