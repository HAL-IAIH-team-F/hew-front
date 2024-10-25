"use client";
import { useState } from "react";
import { FormError, StyledForm } from "../../../util/form/StyledForm";
import { StyledInput } from "../../../util/form/StyledInput";
import FlexBox from "../../../util/FlexBox";
import { StyledButton } from "../../../util/form/StyledButton";
import { useClientContext } from "@/_api/clientWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/_api/wrapper"; // apiClient をインポート

export default function CreatorRegisterForm({ ...props }: CreatorRegisterFormProps) {
  const [errors, setErrors] = useState<FormError>({});
  const router = useRouter();

  // セッションとクライアントコンテキストの取得
  const session = useSession().data;
  const clientContext = useClientContext(session);

  // 入力チェックの関数
  const validateForm = (formData: FormData) => {
    const newErrors: FormError = {};
    const contactAddress = formData.get("contact_address") as string;
    const transferTarget = formData.get("transfer_target") as string;

    if (!contactAddress) {
      newErrors.contact_address = ""; // エラーメッセージ（フロントエンドで設定可）
    }
    if (!transferTarget) {
      newErrors.transfer_target = ""; // エラーメッセージ（フロントエンドで設定可）
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
          setErrors(formErrors);
          return formErrors;
        }
        setErrors({});

        // `user_id` を含むデータベースへの保存
        const contactAddress = formData.get("contact_address") as string;
        const transferTarget = formData.get("transfer_target") as string;
        const userId = session?.user?.id;  // ユーザーIDを取得

        if (!userId) {
          setErrors({ submit: "ユーザーIDが見つかりません。" });
          return { submit: "ユーザーIDが見つかりません。" };
        }

        const postCreatorResult = await clientContext.execBody(
          apiClient.post_creator_api_creator_post,  // エンドポイント名を修正
          { user_id: userId, contact_address: contactAddress, transfer_target: transferTarget }
        );

        // エラーハンドリング
        if (postCreatorResult.error) {
          const errorInfo = postCreatorResult.error;
          setErrors({ submit: `${errorInfo.error_id}: ${errorInfo.message}` });
          return { submit: errorInfo.message };
        }

        // 成功した場合のリダイレクト
        router.push("/creator/timeline");
        return undefined;
      }}
    >
      <div>
        <StyledInput name="contact_address" label="連絡先(一般に表示されます)" />
        {errors.contact_address && (
          <p className="text-red-500 text-sm">{errors.contact_address}</p>
        )}
      </div>
      <div>
        <StyledInput name="transfer_target" label="振込先" />
        {errors.transfer_target && (
          <p className="text-red-500 text-sm">{errors.transfer_target}</p>
        )}
      </div>
      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit}</p>
      )}
      <FlexBox className="justify-end px-10">
        <StyledButton>登録</StyledButton>
      </FlexBox>
    </StyledForm>
  );
}

export interface CreatorRegisterFormProps {}
