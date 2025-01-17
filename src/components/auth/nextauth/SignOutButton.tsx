"use client"
import {ReactNode, useState} from "react";
import {ErrorMessage} from "../../../util/err/ErrorMessage";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {signOut} from "~/auth/clientAuth";


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

export interface LogoutButtonProps {
  children?: ReactNode
  className?: string
}
