"use client"
import {ReactNode, useState} from "react";
import {ErrorMessage} from "../../util/err/ErrorMessage";
import {useModalState} from "~/modal/Modal";


export function SignInButton(
    {
      children,
      onClose,
      ...props
    }: LoginButtonProps,
) {
  const [err, setErr] = useState<string>()
  const modalState = useModalState()

  return (
      <>
        <ErrorMessage error={err}/>
        <button
            {...props}
            onClick={() => {
              // setErr(undefined)
              // signIn(clientContext, onClose).catch(reason => {
              //   setErr(`ログインに失敗しました: {${reason.toString()}}`)
              // })
              if (modalState.state != "closed") {
                console.error("modal is open")
                return
              }
              modalState.open(<div className={"bg-white w-full h-full"}></div>)
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
