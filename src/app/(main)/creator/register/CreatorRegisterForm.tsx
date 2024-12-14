"use client";
import {useClientContext} from "~/api/context/useClientContext";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {apiClient} from "~/api/context/wrapper";
import {StyledFormData} from "../../../../util/form/StyledFormData";
import {FormError, StyledForm} from "../../../../util/form/StyledForm";
import {StyledInput} from "../../../../util/form/StyledInput";

import {StyledButton} from "../../../../util/form/StyledButton";
import FlexBox from "../../../../util/FlexBox";

export default function CreatorRegisterForm({...props}: CreatorRegisterFormProps) {
  const router = useRouter();

  // セッションとクライアントコンテキストの取得
  const session = useSession();
  const clientContext = useClientContext(session);

  // 入力チェックの関数
  const validateForm = (formData: StyledFormData) => {
    const newErrors: FormError = {};
    const contactAddress = formData.get("contact_address") as string;
    const transferTarget = formData.get("transfer_target") as string;

    if (!contactAddress) {
      newErrors.contact_address = "連絡先を入力してください"; // エラーメッセージ（フロントエンドで設定可）
    }
    if (!transferTarget) {
      newErrors.transfer_target = "振込先を入力してください"; // エラーメッセージ（フロントエンドで設定可）
    }
    return newErrors;
  };

  return (
    <StyledForm
      {...props}
      action={async formData => {
        // 入力チェック
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
          return formErrors;
        }

        // `user_id` を含むデータベースへの保存
        const contactAddress = formData.get("contact_address") as string;
        const transferTarget = formData.get("transfer_target") as string;
        const userId = session.data?.user?.id;  // ユーザーIDを取得

        if (!userId) {
          return {submit: "ユーザーIDが見つかりません。"};
        }

        const postCreatorResult = await clientContext.execBody(
          apiClient.pc_api_creator_post,  // エンドポイント名を修正
          {user_id: userId, contact_address: contactAddress, transfer_target: transferTarget}
        );

        // エラーハンドリング
        if (postCreatorResult.error) {
          const errorInfo = postCreatorResult.error;
          return {submit: `${errorInfo.error_id}: ${errorInfo.message}`};
        }

        // 成功した場合のリダイレクト
        router.push("/timeline");
        return undefined;
      }}
    >
      <div>
        <StyledInput name="contact_address" label="連絡先(一般に表示されます)"/>
      </div>
      <div>
        <StyledInput name="transfer_target" label="振込先"/>
      </div>
      <FlexBox className="justify-end px-10">
        <StyledButton>登録</StyledButton>
      </FlexBox>
    </StyledForm>
  );
}

export interface CreatorRegisterFormProps {
}
