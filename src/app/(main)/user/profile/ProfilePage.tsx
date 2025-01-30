"use client";
import React from "react";
import AccountCard from "./accountCard";
import {SignInOutButton} from "~/auth/nextauth/SignInOutButton";
import Link from "next/link";
import {KeycloakConfig} from "~/auth/keycloak/KeycloakConfig"

interface ProfileProps {
}

const ProfilePage: React.FC<ProfileProps> = ({}) => {
  return (
    <div
      style={{
        display: "flex",
<<<<<<< HEAD
        // height: "100vh",
=======
>>>>>>> develop
        background: "rgba(30, 60, 114, 0.6)", // 未来的な青のグラデーション
        fontFamily: "'Roboto', 'Arial', sans-serif",
        color: "#fff", // テキストの色を白に
        overflow: "hidden",
        position: "relative",
        backdropFilter: 'blur(12px)', // 背景ブラー効果
      }}
      className={"h-full"}
    >
      <div
        style={{
          minWidth: "180px",
          background: "rgba(30, 60, 114, 0.9)", // 半透明な青の背景
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2 style={{fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px"}}>Menu</h2>
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

      {/* Main Content */}
      <div
        className={"flex-1 min-w-0 justify-center items-center m-[10px]"}
      >
        <div
          className={"w-full h-full"}
          style={{
            backgroundColor: 'rgba(142, 142, 147, 0.35)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(128, 128, 128, 0.2)',
            position: 'relative', // fixedからrelativeに変更
            borderRadius: '28px',
            zIndex: 1,
            padding: "2px",
            margin: "0 auto", // 自動中央揃え
            boxSizing: "border-box",
            transition: 'opacity 0.2s ease, width 0.3s ease, left 0.3s ease',
          }}
        >
          <AccountCard/>
        </div>
      </div>
    </div>


  );
};

export default ProfilePage;
