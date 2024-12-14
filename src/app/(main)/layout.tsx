import TokenReloader from "~/api/context/TokenReloader";
import SessionPersister from "~/auth/session/SessionPersister";
import {StyledNavigation} from "~/Navigation";
import {ReactNode} from "react";

export default function Layout(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {


  return (
    <>
      <TokenReloader/>
      <SessionPersister/>
      <StyledNavigation/>
      {/*<BackgroundObject/>*/}
      {children}
    </>
  )
}
