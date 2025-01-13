import {SignInButton} from "~/auth/nextauth/SignInButton";
import {SignOutButton} from "~/auth/nextauth/SignOutButton";
import {useClientContextState} from "~/api/context/ClientContextProvider";

export function SignInOutButton(
  {
    onClose,
    ...props
  }: SignInOutButtonProps,
) {
  const context = useClientContextState()
  return (
    <>
      {context.state == "authenticated" ? <SignOutButton {...props}/> : <SignInButton {...props} onClose={onClose}/>}
    </>
  )
}

export interface SignInOutButtonProps {
  onClose?: () => void
  className?: string
}
