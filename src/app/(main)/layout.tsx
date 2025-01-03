import {StyledNavigation} from "~/Navigation";
import {ReactNode} from "react";
import {ClientContextProvider} from "~/api/context/ClientContextProvider";

export default function Layout(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {


  return (
    <>
      <ClientContextProvider>
        {/*<TokenReloader/>*/}
        {/*<StyledNavigation/>*/}
        {/*<BackgroundObject/>*/}
        {children}
      </ClientContextProvider>
    </>
  )
}
