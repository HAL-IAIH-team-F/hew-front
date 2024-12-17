import {HTMLAttributes} from "react";
import {SignInButton} from "~/auth/nextauth/SignInButton";
import {SignOutButton} from "~/auth/nextauth/SignOutButton";
import {useClientContextState} from "~/api/context/ClientContextProvider";

export function SignInOutButton(
  {
    ...props
  }: SignInOutButtonProps,
) {
  const context = useClientContextState()
  return (
    <>
      {context.state == "authenticated" ? <SignOutButton {...props}/> : <SignInButton {...props}/>}
    </>
  )
}

export interface SignInOutButtonProps extends HTMLAttributes<HTMLButtonElement> {
}
