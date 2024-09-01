import {StyledForm} from "../../../util/form/StyledForm";
import {StyledInput} from "../../../util/form/StyledInput";

export default function UserRegisterForm(
  {
    ...props
  }: UserRegisterFormProps,
) {


  return (
    <StyledForm>
      <StyledInput name={"icon"} type={"file"}/>
      <StyledInput name={"display_name"} type={"text"}/>
    </StyledForm>
  )
}

export interface UserRegisterFormProps {
}
