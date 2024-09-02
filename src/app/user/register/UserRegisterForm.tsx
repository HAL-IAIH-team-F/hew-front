import {StyledForm} from "../../../util/form/StyledForm";
import {StyledInput} from "../../../util/form/StyledInput";
import {StyledButton} from "../../../util/form/StyledButton";
import FlexBox from "../../../util/FlexBox";

export default function UserRegisterForm(
  {
    ...props
  }: UserRegisterFormProps,
) {


  return (
    <StyledForm {...props}>
      <StyledInput name={"icon"} type={"file"}/>
      <StyledInput name={"display_name"} type={"text"}/>
      <StyledInput name={"register_creator"} type={"checkbox"}/>
      <FlexBox className={"justify-end px-10"}>
        <StyledButton>ユーザー登録</StyledButton>
      </FlexBox>
    </StyledForm>
  )
}

export interface UserRegisterFormProps {
}
