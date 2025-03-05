"use client";
import {useClientState} from "~/api/context/ClientContextProvider";
import {StyledFormData} from "../../../../../util/form/StyledFormData";
import {StyledForm} from "../../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../../util/form/element/StyledInput";

import {StyledButton} from "../../../../../util/form/element/StyledButton";
import FlexBox from "../../../../../util/FlexBox";
import {Api} from "~/api/context/Api";
import useRoutes from "~/route/useRoutes";
import {useEffect, useState} from "react";
import LoginNeed from "~/UI/loginNeed";


export default function CreatorRegisterForm({...props}: CreatorRegisterFormProps) {
  const routes = useRoutes()
  const clientState = useClientState()
  // セッションとクライアントコンテキストの取得
  const clientContext = useClientState();
  const [mail, setMail] = useState<string>();
  useEffect(() => {
    if (clientContext.state !== "registered") return
    setMail(clientContext.user.user_mail)
  })

  // 入力チェックの関数
  const validateForm = (formData: StyledFormData) => {
    const contactAddress = formData.getStr("contact_address");
    const transferTarget = formData.getStr("transfer_target");

    if (!contactAddress) {
      formData.append("contact_address", "連絡先を入力してください");
    }
    if (!transferTarget) {
      formData.append("transfer_target", "振込先を入力してください");
    }
    return;
  };

  if (clientState.state !== "registered") {
    return (
        <div>
          <LoginNeed/>
        </div>
    )
  }
  return (

      <StyledForm
          {...props}
          action={async formData => {
            // 入力チェック
            validateForm(formData);
            if (formData.formError) {
              return;
            }
            if (clientContext.state != "registered") {
              formData.append("submit", "no login")
              return
            }

            // `user_id` を含むデータベースへの保存
            const contactAddress = formData.get("contact_address") as string;
            const transferTarget = formData.get("transfer_target") as string;
            const userId = clientContext.idToken.idToken.userId;  // ユーザーIDを取得

            const postCreatorResult = await clientContext.client.authBody(
                Api.app.pc_api_creator_post, {},
                {user_id: userId, contact_address: contactAddress, transfer_target: transferTarget}, {}
            );

            // エラーハンドリング
            if (postCreatorResult.error) {
              const errorInfo = postCreatorResult.error;
              formData.append("submit", `{${errorInfo.error_id}: ${errorInfo.message}}`);
              return;
            }

            // 成功した場合のリダイレクト
            routes.timeline().transition()
            return;
          }}
      >
        <h2 className="text-xl font-bold mb-4">クリエイター登録</h2>
        <div>
          <StyledInput name="contact_address" label="連絡先(一般に表示されます)" value={mail}/>
        </div>
        <div className={"hidden"}>
          <StyledInput name="transfer_target" label="振込先" value={"empty"}/>
        </div>
        <FlexBox className="justify-end px-10">
          <StyledButton>登録</StyledButton>
        </FlexBox>
      </StyledForm>
  );
}

export interface CreatorRegisterFormProps {
}
