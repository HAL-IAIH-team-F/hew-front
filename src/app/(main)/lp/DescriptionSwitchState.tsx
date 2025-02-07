import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import useRoutes from "~/route/useRoutes";
import {createLoadingState, LoadingState} from "~/auth/State";
import DescriptionSwitchProcesser from "@/(main)/lp/DescriptionSwitchProcesser";

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
        const setStateAndPrev =
            (newState: DescriptionSwitchAnimationState) => {
                setState(prevState1 => {
                    newState.prevState = prevState1.state
                    return newState
                });
            }
        if (routes.lpDescription().isCurrent()) {
            setStateAndPrev(createOpenedDescriptionAnimationState(setStateAndPrev))
            return
        }
        if (routes.lp().isCurrent()) {
            setStateAndPrev(createCanOpenDescriptionAnimationState(setStateAndPrev))
            return
        }
        setStateAndPrev(createCantOpenDescriptionAnimationState(setStateAndPrev))
    }, [routes]);
    return <Context.Provider
        value={state}
    >
        {children}
        <DescriptionSwitchProcesser/>
    </Context.Provider>;
}

export function useDescriptionSwitchAnimationState() {
    return useContext(Context);
}

export type DescriptionSwitchAnimationState = (LoadingState | OpenedDescriptionAnimationState |
    RequestOpenDescriptionAnimationState | CanOpenDescriptionAnimationState | CantOpenDescriptionAnimationState |
    RequestCloseDescriptionAnimationState) & {
    prevState?: DescriptionSwitchAnimationState["state"] | undefined
}

export interface LoadedDescriptionAnimationState {
    set: (state: DescriptionSwitchAnimationState) => void
}

export interface OpenedDescriptionAnimationState extends LoadedDescriptionAnimationState {
    state: "opened"
}

export function createOpenedDescriptionAnimationState(
    set: (state: DescriptionSwitchAnimationState) => void
): OpenedDescriptionAnimationState {
    return {state: "opened", set}
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

export function createCanOpenDescriptionAnimationState(
    set: (state: DescriptionSwitchAnimationState) => void
): CanOpenDescriptionAnimationState {
    return {state: "canOpen", set}
}

export interface CantOpenDescriptionAnimationState extends LoadedDescriptionAnimationState {
    state: "cantOpen"
}

export function createCantOpenDescriptionAnimationState(
    set: (state: DescriptionSwitchAnimationState) => void
): CantOpenDescriptionAnimationState {
    return {state: "cantOpen", set}
}
