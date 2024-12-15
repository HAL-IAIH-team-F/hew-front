"use client"
import {apiClient} from "~/api/context/wrapper";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {StyledForm} from "../../../../../util/form/StyledForm";
import {StyledInput} from "../../../../../util/form/StyledInput";
import {StyledButton} from "../../../../../util/form/StyledButton";

export default function ColabRegisterForm(
  {
    ...props
  }: ColabRegisterFormProps,
) {
  const clientContext = useClientContextState()

  return (
    <StyledForm {...props} action={async formData => {
      const title = formData.getStr("title", "タイトルを入力してください");
      const description = formData.getStr("description", "説明を入力してください");

      if (!title || !description) return

      const result = await clientContext.context.execBody(
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

 