"use client"
import {HTMLAttributes, useState} from "react";
import {ErrorMessage} from "../../../util/err/ErrorMessage";
import {signOut} from "~/auth/nextauth/clientAuth";
import {useClientContextState} from "~/api/context/ClientContextProvider";


export function SignOutButton(
  {
    children,
    ...props
  }: LogoutButtonProps,) {

  const [err, setErr] = useState<string>()
  const clientContext = useClientContextState()
  return (
    <>
      <ErrorMessage error={err}/>
      <button
        {...props}
        onClick={() => {
          setErr(undefined)
          signOut(clientContext).catch(reason => {
            setErr(`ログアウトに失敗しました: ${reason.toString()}`)
          })
        }}>
        {children || "Logout"}
      </button>
    </>
  )
}

export interface LogoutButtonProps extends HTMLAttributes <HTMLButtonElement> {
}
