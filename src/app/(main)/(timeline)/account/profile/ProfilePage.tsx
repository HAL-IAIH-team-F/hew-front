"use client";
import React, { useState } from "react";
import AccountCard from "./AccountCard/accountCard";
import { SignInOutButton } from "~/auth/nextauth/SignInOutButton";
import { UserCircle } from "lucide-react";
import PurchaseHistoryCard from "./PurchaseHistory/PurchaseHistoryCard";
import SettingsCard from "./Setting/settingsCard";
import CreatorRegisterForm from "../../creator/register/CreatorRegisterForm";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("アカウント");

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-56 bg-gray-900 border-r border-gray-700">
        <div className="h-full flex flex-col">
          {/* Logo/Header Area */}
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8 text-gray-100 flex items-center gap-2">
              <UserCircle className="w-8 h-8" /> アカウント
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4">
            <ul className="space-y-1 p-1">
              {[
                { key: "アカウント", label: "アカウント" },
                { key: "設定", label: "設定" },
                { key: "購入履歴", label: "購入履歴" },
                { key: "クリエイター登録", label: "クリエイター登録" },
              ].map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-150 group ${
                      activeTab === item.key
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-4 border-t border-gray-700">
              <SignInOutButton className="w-full text-sm text-gray-300 hover:text-gray-100 transition-colors duration-150 bottom-0" />
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-900">
        <div className="h-full w-full max-w-full max-h-full box-border">
          {activeTab === "アカウント" && <AccountCard />}
          {activeTab === "設定" && <SettingsCard />}
          {activeTab === "購入履歴" && <PurchaseHistoryCard />}
          {activeTab === "クリエイター登録" && <CreatorRegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
