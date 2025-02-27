"use client"
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {LoadingState} from "~/auth/State";
import {ModalOption} from "~/modal/ModalOption";
import ModalContainer from "~/modal/ModalContainer";

export interface ModalProviderProps {
  children: ReactNode;
}

const Context = createContext<ModalState>(newLoadingModalState());

export function ModalProvider(
    {
      children,
    }: ModalProviderProps
) {
  const [ModalState, setModalState] = useState<ModalState>(newLoadingModalState)

  useEffect(() => {
    if (ModalState.state != "loading") return

    function set(state: ModalState) {
      setModalState(state)
    }

    function close() {
      setModalState({
        state: "closed",
        set,
        open,
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
    <ModalContainer/>
  </Context.Provider>;
}

export function useModalState() {
  return useContext(Context);
}

export type ModalState = LoadingModalState | ClosedModalState | OpenedModalState;

export interface LoadingModalState extends LoadingState {
}

export function newLoadingModalState(): LoadingModalState {
  return {
    state: "loading"
  }
}

export interface ClosedModalState extends AbstractLoadedModalState {
  state: "closed"
  open: (node: ReactNode, opt?: ModalOption) => void
}

export interface OpenedModalState extends AbstractLoadedModalState {
  state: "opened"
  close: () => void
  opt: ModalOption
  node: ReactNode
}

interface AbstractLoadedModalState {
  set: (state: ModalState) => void
}