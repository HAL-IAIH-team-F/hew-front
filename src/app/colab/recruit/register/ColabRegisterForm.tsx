"use client"
import {StyledButton} from "../../../../util/form/StyledButton";
import {apiClient} from "~/api/wrapper";
import {useSession} from "next-auth/react";
import {useClientContext} from "~/api/useClientContext";
import {StyledForm} from "../../../../util/form/StyledForm";
import {StyledInput} from "../../../../util/form/StyledInput";

export default function ColabRegisterForm(
  {
    ...props
  }: ColabRegisterFormProps,
) {
  const session = useSession().data
  const clientContext = useClientContext(session)

  return (
    <StyledForm {...props} action={async formData => {
      const title = formData.getStr("title", "タイトルを入力してください");
      const description = formData.getStr("description", "説明を入力してください");

      if (!title || !description) return

      const result = await clientContext.execBody(
        apiClient.pr_api_recruit_post,
        {
          title: title,
          description: description
        }
      )
      if (result.error) {
        formData.append("submit", result.error.error_id + ": " + result.error.message)
      }
      // router.push(`/recruit/${}`);

      return undefined
    }}>
      <StyledInput name={"title"}/>
      <StyledInput name={"description"}/>
      <StyledButton>募集</StyledButton>
    </StyledForm>
  );
}

export interface ColabRegisterFormProps {
}

 