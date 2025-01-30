import React, {ReactNode} from "react";
import AccountPage from "@/(main)/user/profile/ProfilePage";

export default function Layout(
  {
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {

  return (
    <>
      <AccountPage/>
    </>
  )
}
