"use client"
import {SignInOutButton} from "~/auth/nextauth/SignInOutButton";
import useRoutes from "~/route/useRoutes";

export default function Page(
    {}: {}
) {
  const routes = useRoutes()
  return <div className={"text-white"}>
    <p>no user</p>
    <SignInOutButton onClose={() => routes.accountRoutes.account().transition()}/>
  </div>
}