"use client"
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {LoadingState} from "~/auth/State";
import {ModalOption} from "~/modal/ModalOption";
import LoginModalContainer from "~/modal/LoginModalContainer";

export interface ModalProviderProps {
  children: ReactNode;
}

const Context = createContext<LoginModalState>(newLoadingLoginModalState());

export function LoginModalProvider(
    {
      children,
    }: ModalProviderProps
) {
  const [ModalState, setModalState] = useState<LoginModalState>(newLoadingLoginModalState)

  useEffect(() => {
    if (ModalState.state != "loading") return

    function set(state: LoginModalState) {
      setModalState(state)
    }

    function close() {
      setModalState({
        state: "closed",
        set,
        open,
        close,
      })
    }

    function open(node: ReactNode, opt?: ModalOption) {
      setModalState({
        state: "opened",
        set,
        close,
        opt: opt ?? {},
        node,
      })
    }

    close()
  }, []);

  return <Context.Provider
      value={ModalState}
  >
    {children}
    <LoginModalContainer/>
  </Context.Provider>;
}

export function useLoginModalState() {
  return useContext(Context);
}

export type LoginModalState = LoadingLoginModalState | ClosedLoginModalState | OpenedLoginModalState;

export interface LoadingLoginModalState extends LoadingState {
}

export function newLoadingLoginModalState(): LoadingLoginModalState {
  return {
    state: "loading"
  }
}

export interface ClosedLoginModalState extends AbstractLoadedLoginModalState {
  state: "closed"
  open: (node: ReactNode, opt?: ModalOption) => void
}

export interface OpenedLoginModalState extends AbstractLoadedLoginModalState {
  state: "opened"
  opt: ModalOption
  node: ReactNode
}

interface AbstractLoadedLoginModalState {
  set: (state: LoginModalState) => void
  close: () => void
}