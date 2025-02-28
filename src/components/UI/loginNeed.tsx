"use client";

import {SignInOutButton} from "~/auth/SignInOutButton";

export default function LoginNeed() {
  return (
      <div
          className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        {/* 背景のアクセント */}
        <div className="absolute inset-0 bg-opacity-30 pointer-events-none"/>

        <div
            className="relative bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center w-full max-w-md border border-gray-700 overflow-hidden">
          {/* モーダルの装飾（控えめ） */}
          <div className="absolute -top-10 -left-10 w-16 h-16 bg-blue-500 rounded-full blur-xl opacity-20"></div>

          <h2 className="text-3xl font-bold text-white mb-6">ログインしてください</h2>
          <p className="text-gray-300 mb-6 text-sm">アクセスするにはアカウントにログインが必要です。</p>

          <div className="w-full">
            <SignInOutButton
                className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-lg shadow-md
            transition-all duration-200 hover:bg-gray-500 hover:shadow-lg border border-gray-500/50"
            />
          </div>
        </div>
      </div>
  );
}
