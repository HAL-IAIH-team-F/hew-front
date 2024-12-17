export interface State {
  state: string
}

export interface LoadingState extends State {
  state: "loading"
}