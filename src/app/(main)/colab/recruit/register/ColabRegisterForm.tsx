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
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // 説明を入力してください

    // ボタンの有効/無料を判定
    const isButtonDisabled =!title.trim() || !description.trim(); // ボタンの有効/無効判定

    const handleSubmit = async () => {
        const newErrors: { [key: string]: string } = {};
        if (!title.trim()) newErrors["title"] = "タイトルを入力してください"
        if (!description.trim()) newErrors["description"] = "説明事項を入力してください")

        setErrors(newErrors);

        const result = await clientContext.client.authBody(
            Api.app.pr_api_recruit_post,
            {},
            { title, description },
            {}
        );
    };

  return (
    <StyledForm
        {...props}
        action={async formData => {
      const title = formData.getStr("title", "タイトルを入力してください");
      const description = formData.getStr("description", "説明を入力してください");

      if (!title || !description) return
      if (clientContext.state != "authenticated") throw new Error("no login")
      const result = await clientContext.client.authBody(
        Api.app.pr_api_recruit_post,
          {},
          {title: title, description: description},
          {}
      )
      if (result.error) {
        formData.append("submit", result.error.error_id + ": " + result.error.message)
      }

        return undefined
      }}
    >
        <div className="">
            <div>
                <h1 className="mt-24 mb-44 text-center font-size text-5xl text-white">コラボ募集</h1>
            </div>
            <div className="p-6 mx-auto w-8/12 bg-opacity-100  rounded-2xl">
              <StyledInput
                  name="title"
                  label="募集タイトル"
                  onChange={e => setTitle(e.target.value)} //　タイトル状態を更新
              />
              <StyledInput
                  name="description"
                  label="募集要項"
                  onChange={e => setDescription(e.target.value)} // 説明の状態を更新
              />
              <StyledButton
                  className="mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isButtonDisabled}
                >
                  募集する
              </StyledButton>
            </div>
        </div>
    </StyledForm>
  );
}
export interface ColabRegisterFormProps {
}

 