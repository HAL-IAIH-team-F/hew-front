"use client"
import { SignInOutButton } from "~/auth/nextauth/SignInOutButton";
import useRoutes from "~/route/useRoutes";
import { useEffect } from "react";
import { motion } from "framer-motion";
import LoginNeed from "~/UI/loginNeed";

export default function Page({}: {}) {
  const routes = useRoutes();

  useEffect(() => {
    if (routes.accountRoutes.account().isCurrent()) return;
    routes.accountRoutes.account().transition().catch(console.error);
  }, [routes]);

  return (
    <div>
      <LoginNeed/>
    </div>
  );
}
