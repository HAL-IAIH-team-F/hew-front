"use client"
import useRoutes from "~/route/useRoutes";
import {useEffect} from "react";
import LoginNeed from "~/UI/loginNeed";

export default function Page({}: {}) {
  const routes = useRoutes();

  useEffect(() => {
    if (routes.account.account().isCurrent()) return;
    routes.account.account().transition().catch(console.error);
  }, [routes]);

  return (
      <div>
        <LoginNeed/>
      </div>
  );
}
