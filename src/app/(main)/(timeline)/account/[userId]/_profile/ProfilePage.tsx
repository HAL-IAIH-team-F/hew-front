"use client";
import React, {ReactNode} from "react";
import {SignInOutButton} from "~/auth/nextauth/SignInOutButton";
import {UserCircle} from "lucide-react";
import MenuLink from "@/(main)/(timeline)/_window/_main/menu/MenuLink";
import useRoutes from "~/route/useRoutes";

function ProfilePage(
    {
      children,
    }: {
      children: ReactNode
    }
) {
  const routes = useRoutes()

  return (
      <div className="flex h-screen bg-gray-900">
        {/* Sidebar */}
        <div className="w-56 bg-gray-900 border-r border-gray-700">
          <div className="h-full flex flex-col">
            {/* Logo/Header Area */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-8 text-gray-100 flex items-center gap-2">
                <UserCircle className="w-8 h-8"/> アカウント
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4">
              <ul className="space-y-1 p-1">
                <MenuLink
                    label={"アカウント"}
                    routeUrl={routes.account.account()}
                />
                <MenuLink
                    label={"設定"}
                    routeUrl={routes.account.setting()}
                />
                <MenuLink
                    label={"購入履歴"}
                    routeUrl={routes.account.history()}
                />
                <MenuLink
                    label={"クリエイター登録"}
                    routeUrl={routes.account.creatorRegister()}
                />
              </ul>
              <div className="p-4 border-t border-gray-700 z-[99999]">
                <SignInOutButton
                    className="w-full text-sm text-gray-300 hover:text-gray-100 transition-colors duration-150 bottom-0"/>
              </div>
            </nav>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-gray-900">
          <div className="h-full w-full max-w-full max-h-full box-border">
            {children}
          </div>
        </div>
      </div>
  );
}

export default ProfilePage;
