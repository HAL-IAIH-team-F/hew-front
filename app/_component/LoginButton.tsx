"use client"
import {HTMLAttributes, useState} from "react";
import {signIn} from "next-auth/react";
import {ErrorMessage} from "@/app/_component/ErrorMessage";

export default function LoginButton(
  {
    children,
    ...props
  }: LoginButtonProps,
) {
  const [err, setErr] = useState<string>()

  return (
    <>
      <ErrorMessage error={err}/>
      <button
        {...props}
        onClick={() => {
          setErr(undefined)
          signIn("keycloak").catch(reason => {
            setErr(`ログインに失敗しました: ${reason.toString()}`)
          })
        }}>
        {children || "Login"}
      </button>
    </>
  )
}

export interface LoginButtonProps extends HTMLAttributes<HTMLButtonElement> {
}
