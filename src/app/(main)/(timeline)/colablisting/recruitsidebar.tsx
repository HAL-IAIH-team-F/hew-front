"use client";
import React, { useState } from "react";
import useProducts from "~/hooks/useProducts";
import { Handshake } from "lucide-react";
import ColabRegisterForm from "../colab/recruit/register/ColabRegisterForm";
import ColabRegisterpage from "../colab/register/page";
import RequestRecruit from "../colab/recruit/page";

export default function CollabRecruitPage() {
  const [activeTab, setActiveTab] = useState("募集一覧");

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-56 bg-gray-900 border-r border-gray-700">
        <div className="h-full flex flex-col">
          {/* Logo/Header Area */}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-2">
                <Handshake className="w-8 h-8" />
                    コラボ
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4">
            <ul className="space-y-1 p-1">
              {[
                { key: "募集一覧", label: "募集一覧" },
                { key: "募集投稿", label: "募集投稿" },
                { key: "コラボ一覧", label: "コラボ一覧" },
              ].map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-150 group w-full ${
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
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-900">
        <div className="h-full w-full max-w-full max-h-full box-border">
          {activeTab === "募集一覧" && <RequestRecruit/>}
          {activeTab === "募集投稿" && <ColabRegisterpage />}
          {activeTab === "コラボ一覧" && <p>募集一覧</p>}
        </div>
      </div>
    </div>
  );
}