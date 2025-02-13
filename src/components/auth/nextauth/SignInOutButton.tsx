"use client"
import {SignInButton} from "~/auth/nextauth/SignInButton";
import {SignOutButton} from "~/auth/nextauth/SignOutButton";
import {useClientState} from "~/api/context/ClientContextProvider";

export function SignInOutButton(
  {
    onClose,
    ...props
  }: SignInOutButtonProps,
) {
  const context = useClientState()
  return (
    <>
      {context.state == "registered" ? <SignOutButton {...props}/> : <SignInButton {...props} onClose={onClose}/>}
    </>
  )
}

export interface SignInOutButtonProps {
  onClose?: () => void
  className?: string
}
