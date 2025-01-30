"use client";
import React, { useEffect, useState } from "react";
import { Api } from "~/api/context/Api";
import { useClientState } from "~/api/context/ClientContextProvider";
import { ErrorData } from "../../../../../util/err/err";
import { ErrorMessage } from "../../../../../util/err/ErrorMessage";

// --- 1. RecruitRes 型定義 ---
export interface RecruitRes {
  recruit_id: string;
  creator_id: string;
  title: string;
  description: string;
}

// --- 2. メインのPageコンポーネント ---
export default function CollabRecruitPage() {
  const [recruits, setRecruits] = useState<RecruitRes[]>([]);
  const [err, setErr] = useState<ErrorData>();
  const clientContext = useClientState();

  useEffect(() => {
    // API呼び出しでリクルート一覧を取得
    clientContext.client.unAuth(Api.app.grs_api_recruit_get, {}, {})
      .then((value) => {
        if (value.error) {
          setErr(value.error);
        } else {
          setRecruits(value.success);
        }
      });
  }, []);

  return (
    <>
      {/* --- 左サイドメニュー --- */}
        <div style={{
            height: "750px",
            minWidth: "200px",
            background: "rgba(30, 60, 114, 0.9)",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(12px)",
            color: "#fff",
            borderRadius: "16px 10px 10px 16px",
            // overflow: "hidden",
            }}
        >
            <h2
            style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "20px",
            }}
            >
            メニュー
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "10px" }}>
                <a
                href="#"
                style={{
                    color: "#d1e1ff",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
                >
                募集一覧
                </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
                <a
                href="#"
                style={{
                    color: "#d1e1ff",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
                >
                募集投稿
                </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
                <a
                href="#"
                style={{
                    color: "#d1e1ff",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
                >
                コラボ一覧
                </a>
            </li>
            <li style={{ marginBottom: "10px" }}>
                <a
                href="#"
                style={{
                    color: "#d1e1ff",
                    textDecoration: "none",
                    fontSize: "1.1rem",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#d1e1ff")}
                >
                チャット
                </a>
            </li>
            </ul>
        </div>
    </>
  );
}

