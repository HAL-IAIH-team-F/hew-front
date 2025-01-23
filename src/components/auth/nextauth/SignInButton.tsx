"use client"
import {ReactNode, useState} from "react";
import {ErrorMessage} from "../../../util/err/ErrorMessage";
import {useClientState} from "~/api/context/ClientContextProvider";
import {signIn} from "~/auth/clientAuth";


export function SignInButton(
  {
    children,
    onClose,
    ...props
  }: LoginButtonProps,
) {
  const [err, setErr] = useState<string>()
  const clientContext = useClientState()

  return (
    <>
      <ErrorMessage error={err}/>
      <button
        {...props}
        onClick={() => {
          setErr(undefined)
          signIn(clientContext, onClose).catch(reason => {
            setErr(`ログインに失敗しました: {${reason.toString()}}`)
          })
        }}>
        {children || "Login"}
      </button>
    </>
  )
}

export interface LoginButtonProps {
  onClose?: () => void
  children?: ReactNode
}
