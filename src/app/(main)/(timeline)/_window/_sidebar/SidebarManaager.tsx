"use client"
import {createContext, ReactNode, useContext, useMemo} from "react";
import {Manager} from "~/manager/manager";

export interface SidebarManaagerProviderProps {
  children: ReactNode;
}

const Context = createContext<SidebarManagerState>({state: "loading"});

export function SidebarManagerProvider(
  {
    children,
  }: SidebarManaagerProviderProps
) {
  const SidebarManaagerState = useMemo<SidebarManagerState>(() => {
    return {state: "loaded", manager: new Manager()};
  }, []);
  return <Context.Provider
    value={SidebarManaagerState}
  >
    {children}
  </Context.Provider>;
}

export function useSidebarManagerState() {
  return useContext(Context);
}

export type SidebarManagerState = SidebarManagerLoadedState | SidebarManagerLoadingState;

export interface SidebarManagerLoadedState {
  state: "loaded"
  manager: Manager
}

export interface SidebarManagerLoadingState {
  state: "loading"
}
