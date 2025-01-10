import {ErrorMessage} from "../err/ErrorMessage";
import {useFormState} from "./element/StyledForm";

export default function FormErrMsg(
  {
    name,
  }: {
    name: string
  },
) {
  const formState = useFormState()

  return (
    <ErrorMessage error={name && formState.err && formState.err[name]}/>
  )
}
