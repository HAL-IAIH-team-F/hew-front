"use client"
import {CSSProperties, MouseEventHandler, ReactNode} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useLoginModalState} from "~/modal/LoginModal";
import SignInFrame from "~/auth/SignInFrame";


export function SignInButton(
    {
      children,
      onClose,
      onClick,
      ...props
    }: LoginButtonProps,
) {
  const modalState = useLoginModalState()
  const clientState = useClientState()

  return (
      <>
        <button
            {...props} disabled={clientState.state == "loading"}
            onClick={(event) => {
              onClick?.(event)
              if (clientState.state == "loading") return;
              if (modalState.state != "closed") {
                console.error("modal is open")
                return
              }
              modalState.open(
                  <SignInFrame clientState={clientState} onSignIn={() => {
                    modalState.close()
                  }}/>,
                  {width: "700px", height: "800px"},
              )
            }}>
          {children || (clientState.state == "loading" ? "Loading" : "Login")}
        </button>
      </>
  )
}

export interface LoginButtonProps {
  onClose?: () => void
  children?: ReactNode
  style?: CSSProperties | undefined;
  onMouseOver?: MouseEventHandler | undefined;
  onMouseOut?: MouseEventHandler | undefined;
  onClick?: MouseEventHandler | undefined;
}
