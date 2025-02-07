import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import useRoutes from "~/route/useRoutes";
import {createLoadingState, LoadingState} from "~/auth/State";

export interface DescriptionSwitchAnimationProviderProps {
    children: ReactNode;
}

const Context = createContext<DescriptionSwitchAnimationState>(createLoadingState());

export function DescriptionSwitchAnimationProvider(
    {
        children,
    }: DescriptionSwitchAnimationProviderProps
) {
    const routes = useRoutes()
    const [state, setState] = useState<DescriptionSwitchAnimationState>(createLoadingState())
    useEffect(() => {
        if (routes.lpDescription().isCurrent()) {
            setState({state: "opened", set: setState})
            return
        }
        if (routes.lp().isCurrent()) {
            setState({state: "canOpen", set: setState})
            return
        }
    }, [routes]);
    return <Context.Provider
        value={state}
    >
        {children}
    </Context.Provider>;
}

export function useDescriptionSwitchAnimationState() {
    return useContext(Context);
}

export type DescriptionSwitchAnimationState = LoadingState | OpenedDescriptionAnimationState |
    RequestOpenDescriptionAnimationState | CanOpenDescriptionAnimationState | CantOpenDescriptionAnimationState |
    RequestCloseDescriptionAnimationState

export interface LoadedDescriptionAnimationState {
    set: (state: DescriptionSwitchAnimationState) => void
}

export interface OpenedDescriptionAnimationState extends LoadedDescriptionAnimationState {
    state: "opened"
}

export interface RequestOpenDescriptionAnimationState extends LoadedDescriptionAnimationState {
    state: "requestOpen"
}

export function createRequestOpenDescriptionAnimationState(
    set: (state: DescriptionSwitchAnimationState) => void
): RequestOpenDescriptionAnimationState {
    return {state: "requestOpen", set}
}

export interface RequestCloseDescriptionAnimationState extends LoadedDescriptionAnimationState {
    state: "requestClose"
}

export function createRequestCloseDescriptionAnimationState(
    set: (state: DescriptionSwitchAnimationState) => void
): RequestCloseDescriptionAnimationState {
    return {state: "requestClose", set}
}

export interface CanOpenDescriptionAnimationState extends LoadedDescriptionAnimationState {
    state: "canOpen"
}

export interface CantOpenDescriptionAnimationState extends LoadedDescriptionAnimationState {
    state: "cantOpen"
}