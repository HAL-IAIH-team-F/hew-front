"use client";
import React from "react";
import AccountCard from "./accountCard";
import {SignInOutButton} from "~/auth/nextauth/SignInOutButton";
import {UserCircle} from 'lucide-react';


const ProfilePage = () => {
  return (
      <div className="flex h-screen bg-gray-900">
        {/* Sidebar */}
        <div className="w-56 bg-gray-800 border-r border-gray-700">
          <div className="h-full flex flex-col">
            {/* Logo/Header Area */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-8 text-gray-100 flex items-center gap-2">
                <UserCircle className="w-8 h-8"/>アカウント
              </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4">
              <ul className="space-y-1">
                {[
                  {href: "#profile", label: "Profile"},
                  {href: "#settings", label: "Settings"},
                  {href: "#notifications", label: "Notifications"},
                  {href: "#account", label: "Account"}
                ].map((item) => (
                    <li key={item.label}>
                      <a
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors duration-150 group"
                      >
                        {item.label}
                      </a>
                    </li>
                ))}
              </ul>
              <div className="p-4 border-t border-gray-700">
                <SignInOutButton
                    className="w-full text-sm text-gray-300 hover:text-gray-100 transition-colors duration-150 bottom-0"/>
              </div>
            </nav>

          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden bg-gray-800">
          <div className="h-full w-full max-w-full max-h-full box-border">
            <AccountCard/>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;