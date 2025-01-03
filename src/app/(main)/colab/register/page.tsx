"use client"
import {StyledForm} from "../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../util/form/element/StyledInput";
import {useRouter} from "next/navigation";
import CreatorsSelector from "@/(main)/colab/register/CreatorsSelector";
import {StyledButton} from "../../../../util/form/element/StyledButton";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import {useState} from "react";
import {CreatorRes} from "@/(main)/colab/register/CreatorRes";

export default function Page(
  {}: {}
) {
  const clientContext = useClientContextState()
  const [creators, setCreators] = useState<CreatorRes[]>([])
  const router = useRouter()

  return <StyledForm action={async formData => {
    if (clientContext.state != "authenticated") throw new Error("not authenticated")
    const title = formData.getStr("title")
    const description = formData.getStr("description")

    if (!title || !description) return

    const result = await clientContext.client.authBody(Api.app.pc_api_colab_post,
      {},{
      creators: creators.map(value => value.creator_id), title: title, description: description
    },{})
    if (!result.error) return router.push("/timeline")
    formData.append("submit", `{${result.error.error_id}: ${result.error.message}}`)
  }}>
    <StyledInput name={"title"}/>
    <StyledInput name={"description"}/>
    <CreatorsSelector creators={creators} setCreators={setCreators}/>
    <StyledButton type={"submit"}>submit</StyledButton>
  </StyledForm>
}