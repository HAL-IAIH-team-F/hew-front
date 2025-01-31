"use client";
import React from "react";
import AccountCard from "./accountCard";
import {SignInOutButton} from "~/auth/nextauth/SignInOutButton";
import Link from "next/link";
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig";
import {useWindowSize} from "@/_hook/useWindowSize";

interface ProfileProps {
}

const ProfilePage: React.FC<ProfileProps> = ({}) => {
  const size = useWindowSize();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "rgba(30, 60, 114, 0.6)", // 未来的な青のグラデーション
        fontFamily: "'Roboto', 'Arial', sans-serif",
        color: "#fff", // テキストの色を白に
        overflow: "hidden",
        backdropFilter: "blur(12px)", // 背景ブラー効果

      }}
    >
      {/* Sidebar */}
      <div
        style={{
          minWidth: "100px",
          maxWidth: "200px",
          background: "rgba(30, 60, 114, 0.9)", // 半透明な青の背景
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Menu
        </h2>
        <ul style={{listStyle: "none", padding: 0, margin: 0}}>
          <li style={{marginBottom: "10px"}}>
            <a
              href="#profile"
              style={{
                color: "#d1e1ff",
                textDecoration: "none",
                fontSize: "1.1rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
            >
              Profile
            </a>
          </li>
          <li style={{marginBottom: "10px"}}>
            <a
              href="#settings"
              style={{
                color: "#d1e1ff",
                textDecoration: "none",
                fontSize: "1.1rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
            >
              Settings
            </a>
          </li>
          <li style={{marginBottom: "10px"}}>
            <a
              href="#notifications"
              style={{
                color: "#d1e1ff",
                textDecoration: "none",
                fontSize: "1.1rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
            >
              Notifications
            </a>
          </li>
          <li style={{marginBottom: "10px"}}>
            <Link
              href={new URL("/realms/develop/account/", KeycloakConfig.baseUrl)}
              style={{
                color: "#d1e1ff",
                textDecoration: "none",
                fontSize: "1.1rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
            >
              Account
            </Link>
          </li>
          <li>
            <a
              style={{
                color: "#d1e1ff",
                textDecoration: "none",
                fontSize: "1.1rem",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
            >
              <SignInOutButton
                className="font-bold block w-full my-1 py-1 text-left text-xs text-white hover:text-gray-400"
              />
            </a>
          </li>
        </ul>
      </div>

      <div
        style={{
          width: "100%", // 親要素の幅全体を使用
          height: "100%", // 親要素の高さ全体を使用
          display: "flex", // フレックスレイアウト
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // サイズを超える部分を隠す

        }}
      >
        <div
          style={{
            width: "100%", // 親要素の幅全体を使用
            height: "100%", // 親要素の高さ全体を使用
            maxWidth: "100%", // 最大幅制限を親要素の幅に設定
            maxHeight: "100%", // 最大高さ制限を親要素の高さに設定
            boxSizing: "border-box", // パディングや境界線を含めてサイズ計算

          }}
        >
          <AccountCard/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
