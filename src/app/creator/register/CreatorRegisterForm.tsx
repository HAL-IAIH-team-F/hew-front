import {StyledForm} from "../../../util/form/StyledForm";
import {StyledInput} from "../../../util/form/StyledInput";
import FlexBox from "../../../util/FlexBox";
import {StyledButton} from "../../../util/form/StyledButton";

export default function CreatorRegisterForm(
  {
  }: CreatorRegisterFormProps,
) {
  return (
    <StyledForm >
      <StyledInput name={"contact_address"} label={"連絡先(一般に表示されます)"}/>
      <StyledInput name={"transfer_target"} label={"振込先"}/>
      <FlexBox className={"justify-end px-10"}>
        <StyledButton>登録</StyledButton>
      </FlexBox>
    </StyledForm>
  )
}

export interface CreatorRegisterFormProps {
}
