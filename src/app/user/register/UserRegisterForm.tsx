import {StyledForm} from "../../../util/form/StyledForm";
import {StyledInput} from "../../../util/form/StyledInput";
import ItemBackground from "~/ItemBackground";

export default function UserRegisterForm(
  {
    ...props
  }: UserRegisterFormProps,
) {


  return (
    <StyledForm>
      <ItemBackground>
        <StyledInput name={"icon"} type={"file"}/>
      </ItemBackground>
      <StyledInput name={"display_name"} type={"text"}/>
    </StyledForm>
  )
}

export interface UserRegisterFormProps {
}
