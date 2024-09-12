import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import {FC} from "react";

export default function App(
  {
    Component,
    pageProps: {session, ...pageProps},
    ...props
  }: AppProps,
) {


  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}

export interface AppProps {
  Component: FC
  pageProps: { session: Session }
}
