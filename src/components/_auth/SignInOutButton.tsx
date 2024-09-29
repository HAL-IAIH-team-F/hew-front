import {HTMLAttributes} from "react";
import {SignInButton} from "~/_auth/SignInButton";
import {SignOutButton} from "~/_auth/SignOutButton";
import {useSession} from "next-auth/react";

export function SignInOutButton(
  {
    ...props
  }: SignInOutButtonProps,
) {
  const session = useSession().data

  return (
    <>
      {session?.user ? <SignOutButton {...props}/> :  <SignInButton {...props}/> }
    </>
  )
}

export interface SignInOutButtonProps extends HTMLAttributes<HTMLButtonElement> {
}
