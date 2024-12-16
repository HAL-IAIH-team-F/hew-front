import {FC} from "react";

export default function App(
  {
    Component,
    pageProps: {...pageProps},
    ...props
  }: AppProps,
) {


  return (
    <Component {...pageProps}/>
  )
}

export interface AppProps {
  Component: FC
  pageProps: {}
}
