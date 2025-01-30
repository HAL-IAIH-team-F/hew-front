"use client";
import React from "react";
import AccountCard from "./accountCard";
import {styles} from "~/Sidebar/Styles";
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
        // height: "100vh",
        background: "rgba(30, 60, 114, 0.6)", // 未来的な青のグラデーション
        fontFamily: "'Roboto', 'Arial', sans-serif",
        color: "#fff", // テキストの色を白に
        overflow: "hidden",
        position: "relative",
        backdropFilter: 'blur(12px)', // 背景ブラー効果
      }}
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
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <div style={styles.inAppPageWindowStyle}>
          <AccountCard/>
        </div>
      </div>
    </div>


  );
};

export default ProfilePage;
