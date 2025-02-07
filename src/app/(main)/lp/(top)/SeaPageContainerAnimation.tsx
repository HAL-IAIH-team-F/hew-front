import {createContext, ReactNode, useContext, useMemo} from "react";

export interface SeaPageContainerAnimationProviderProps {
    children: ReactNode;
}

const Context = createContext<SeaPageContainerAnimationState | undefined>(undefined);

export function SeaPageContainerAnimationProvider(
    {
        children,
    }: SeaPageContainerAnimationProviderProps
) {
    const SeaPageContainerAnimationState = useMemo<SeaPageContainerAnimationState>(() => {
        return {};
    }, []);
    return <Context.Provider
        value={SeaPageContainerAnimationState}
    >
        {children}
    </Context.Provider>;
}

export function useSeaPageContainerAnimationState() {
    return useContext(Context);
}

export interface SeaPageContainerAnimationState {
}
