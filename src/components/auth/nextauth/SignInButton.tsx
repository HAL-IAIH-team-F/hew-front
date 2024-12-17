"use client"
import {HTMLAttributes, useState} from "react";
import {ErrorMessage} from "../../../util/err/ErrorMessage";
import {signIn} from "~/auth/nextauth/clientAuth";
import {useClientContextState} from "~/api/context/ClientContextProvider";


export function SignInButton(
  {
    children,
    ...props
  }: LoginButtonProps,
) {
  const [err, setErr] = useState<string>()
  const clientContext = useClientContextState()

  return (
    <>
      <ErrorMessage error={err}/>
      <button
        {...props}
        onClick={() => {
          setErr(undefined)
          signIn(clientContext).catch(reason => {
            setErr(`ログインに失敗しました: {${reason.toString()}}`)
          })
        }}>
        {children || "Login"}
      </button>
    </>
  )
}

export interface LoginButtonProps extends HTMLAttributes<HTMLButtonElement> {
}
