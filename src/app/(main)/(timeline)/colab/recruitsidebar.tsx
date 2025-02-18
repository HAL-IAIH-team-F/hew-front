"use client";
import React, {ReactNode} from "react";
import {Handshake} from "lucide-react";
import MenuLink from "@/(main)/(timeline)/_window/_main/menu/MenuLink";
import useRoutes from "~/route/useRoutes";

export default function CollabRecruitPage(
    {
      children
    }: {
      children: ReactNode;
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
              <h1 className="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-2">
                <Handshake className="w-8 h-8"/>
                コラボ
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4">
              <ul className="space-y-1 p-1">
                <MenuLink routeUrl={routes.colab.chat()} label={"チャット"}/>
                <MenuLink routeUrl={routes.colab.colabRegister()} label={"コラボ投稿"}/>
                <MenuLink routeUrl={routes.colab.recruit()} label={"募集一覧"}/>
                <MenuLink routeUrl={routes.colab.recruitRegister()} label={"募集投稿"}/>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden bg-gray-900">
          <div className="h-full w-full max-w-full max-h-full box-border">
            {children}
          </div>
        </div>
      </div>
  );
}