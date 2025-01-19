"use client"
import {useClientState} from "~/api/context/ClientContextProvider";
import {StyledForm} from "../../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../../util/form/element/StyledInput";
import {StyledButton} from "../../../../../util/form/element/StyledButton";
import {Api} from "~/api/context/Api";

export default function ColabRegisterForm(
  {
    ...props
  }: ColabRegisterFormProps,
) {
  const clientContext = useClientState()

  return (
    <StyledForm {...props} action={async formData => {
      const title = formData.getStr("title", "タイトルを入力してください");
      const description = formData.getStr("description", "説明を入力してください");

      if (!title || !description) return
      if (clientContext.state != "registered") throw new Error("no login")
      const result = await clientContext.client.authBody(
        Api.app.pr_api_recruit_post,{},
        {
          title: title,
          description: description
        },{}
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

 