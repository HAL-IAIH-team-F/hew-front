"use client";
import React, {ReactNode, useState} from "react";
import {SignInOutButton} from "~/auth/SignInOutButton";
import {Menu, UserCircle, X} from "lucide-react";
import MenuLink from "@/(main)/(timeline)/_window/_main/menu/MenuLink";
import useRoutes from "~/route/useRoutes";
import {useClientState} from "~/api/context/ClientContextProvider";

function ProfilePage({children}: { children: ReactNode }) {
  const routes = useRoutes();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const clientState = useClientState()

  return (
      <div className="flex flex-col sm:flex-row bg-gray-900 h-full">
        {/* Sidebar Toggle Button (Mobile) */}
        <button
            className="sm:hidden p-4 text-gray-100 flex items-center gap-2"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-6 h-6"/>
        </button>

        {/* Sidebar */}
        <div
            className={`
          fixed sm:relative bg-gray-900 border-r border-gray-700 h-full w-56 
          sm:block transition-transform transform  z-[1000]
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
        `}
        >
          <div className="h-full flex flex-col">
            {/* Close Button (Mobile) */}
            <button
                className="sm:hidden p-4 text-gray-100 flex items-center gap-2 self-end"
                onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6"/> 閉じる
            </button>

            {/* Logo/Header Area */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-8 text-gray-100 flex items-center gap-2">
                <UserCircle className="w-8 h-8"/> アカウント
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4">
              <ul className="space-y-1 p-1">
                <MenuLink label="アカウント" routeUrl={routes.account.account()}/>
                <MenuLink label="設定" routeUrl={routes.account.setting()}/>
                <MenuLink label="認証" routeUrl={routes.account.auth()}/>
                <MenuLink label="購入履歴" routeUrl={routes.account.history()}/>
                {
                    (clientState.state != "registered" || clientState.user.creator_data == undefined) &&
                  <MenuLink label="クリエイター登録" routeUrl={routes.account.creatorRegister()}/>
                }
              </ul>
              <div className="p-4 border-t border-gray-700">
                <SignInOutButton
                    className="w-full text-sm text-gray-300 hover:text-gray-100 transition-colors duration-150"/>
              </div>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-gray-900">
          <div className="h-full w-full max-w-full max-h-full box-border">
            {children}
          </div>
        </div>
      </div>
  );
}

export default ProfilePage;
