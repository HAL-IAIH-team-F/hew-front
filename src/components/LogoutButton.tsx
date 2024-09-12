"use client"
import {HTMLAttributes, useState} from "react";
import {ErrorMessage} from "../util/err/ErrorMessage";
import {signOut} from "~/_auth/authClient";


export default function LogoutButton(
  {
    children,
    ...props
  }: LogoutButtonProps,) {

  const [err, setErr] = useState<string>()

  return (
    <>
      <ErrorMessage error={err}/>
      <button
        {...props}
        onClick={() => {
          setErr(undefined)
          signOut().catch(reason => {
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
