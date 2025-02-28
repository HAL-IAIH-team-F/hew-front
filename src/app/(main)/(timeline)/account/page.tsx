"use client"
import {SignInOutButton} from "~/auth/nextauth/SignInOutButton";
import useRoutes from "~/route/useRoutes";
import {useEffect} from "react";

export default function Page(
    {}: {}
) {
  const routes = useRoutes()

  useEffect(() => {
    if (routes.account.account().isCurrent()) return
    routes.account.account().transition().catch(console.error)
  }, [routes]);
  return <div className={"text-white p-16"}>
    <h2 className={"text-3xl"}>no login</h2>
    <SignInOutButton
        className={
          "px-6 py-3 text-sm rounded-lg transition-all duration-200 bg-gray-700 text-gray-100 font-medium " +
            "hover:bg-gray-600 mt-4"
        }
        onClose={() => routes.account.account().transition()}
    />
  </div>
}