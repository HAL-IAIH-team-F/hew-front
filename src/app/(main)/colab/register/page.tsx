"use client"
import {StyledForm} from "../../../../util/form/StyledForm";
import {StyledInput} from "../../../../util/form/StyledInput";
import {useSearchParams} from "next/navigation";
import CreatorsSelector from "@/(main)/colab/register/CreatorsSelector";

export default function Page(
  {}: {}
) {
  const search = useSearchParams()

  return <StyledForm>
    <StyledInput name={"title"}/>
    <StyledInput name={"description"}/>
    <CreatorsSelector/>
  </StyledForm>
}