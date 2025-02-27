"use client"
import {ReactNode, useState} from "react";
import {ErrorMessage} from "../../util/err/ErrorMessage";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useModalState} from "~/modal/Modal";
import SignInFrame from "~/auth/SignInFrame";


export function SignInButton(
    {
      children,
      onClose,
      ...props
    }: LoginButtonProps,
) {
  const [err, setErr] = useState<string>()
  const modalState = useModalState()
  const clientState = useClientState()

  return (
      <>
        <ErrorMessage error={err}/>
        <button
            {...props} disabled={clientState.state == "loading"}
            onClick={() => {
              if (clientState.state == "loading") return;
              // setErr(undefined)
              // signIn(clientContext, onClose).catch(reason => {
              //   setErr(`ログインに失敗しました: {${reason.toString()}}`)
              // })
              if (modalState.state != "closed") {
                console.error("modal is open")
                return
              }
              modalState.open(<div className={"bg-white w-full h-full"}>
                <SignInFrame clientState={clientState}/>
              </div>)
            }}>
          {children || clientState.state == "loading" ? "Loading" : "Login"}
        </button>
      </>
  )
}

export interface LoginButtonProps {
  onClose?: () => void
  children?: ReactNode
}
