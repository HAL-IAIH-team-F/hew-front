"use client"
import {StyledForm} from "../../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../../util/form/element/StyledInput";
import CreatorsSelector from "@/(main)/(timeline)/colab/register/CreatorsSelector";
import {StyledButton} from "../../../../../util/form/element/StyledButton";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import {useState} from "react";

import useRoutes from "~/route/useRoutes";
import {CreatorRes} from "~/hooks/useCreatorData";


export default function Page(
    {}: {}
) {
  const clientContext = useClientState()
  const [creators, setCreators] = useState<CreatorRes[]>([])
  const routes = useRoutes()

  return <StyledForm action={async formData => {
    console.debug("submit-b", creators,clientContext.state)
    if (clientContext.state != "registered") throw new Error("not authenticated")
    const title = formData.getStr("title")
    const description = formData.getStr("description")
    console.debug("submit", creators, title, description)

    if (!title || !description) return

    console.debug("submit-a", creators, title, description)
    const result = await clientContext.client.authBody(Api.app.pc_api_colab_post,
        {}, {
          creators: creators.map(value => value.creator_id), title: title, description: description
        }, {})
    if (!result.error) {
      routes.timeline().transition()
      return
    }
    formData.append("submit", `{${result.error.error_id}: ${result.error.message}}`)
  }}>
    <StyledInput name={"title"}/>
    <StyledInput name={"description"}/>
    <CreatorsSelector creators={creators} setCreators={setCreators}/>
    <StyledButton type={"submit"}>submit</StyledButton>
  </StyledForm>
}