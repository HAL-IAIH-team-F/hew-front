import {FormError} from "./element/StyledForm";

export interface FormContext {
  err: FormError | undefined
  disabled: boolean
}