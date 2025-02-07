export interface State {
    state: string
}

export interface LoadingState extends State {
    state: "loading"
}

export function createLoadingState(): LoadingState {
    return {state: "loading"}
}