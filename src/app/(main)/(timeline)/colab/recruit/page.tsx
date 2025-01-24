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
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "rgba(30, 60, 114, 0.6)",  // 薄暗い青背景
        backdropFilter: "blur(12px)",
        color: "#fff",
        fontFamily: "'Roboto', 'Arial', sans-serif",
      }}
    >
      {/* --- 左サイドメニュー --- */}
      <div
        style={{
          minWidth: "200px",
          background: "rgba(30, 60, 114, 0.9)",
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

      {/* --- 右メインコンテンツ --- */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {/* エラーメッセージ表示 */}
        <ErrorMessage error={err} />

        {/* ▼▼▼ ここをグリッドに変更 ▼▼▼ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3列にする
            gap: "16px", // カード同士の間隔
          }}
        >
          {recruits.map((recruit) => (
            <RecruitCard
              key={recruit.recruit_id}
              recruit={recruit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 3. RecruitCard コンポーネント ---
function RecruitCard({ recruit }: { recruit: RecruitRes }) {
  const clientContext = useClientState();
  const [err, setErr] = useState<ErrorData>();

  // ボタンクリック時の処理
  const handleRequest = () => {
    setErr(undefined);
    if (clientContext.state !== "registered") {
      throw new Error("not authenticated");
    }
    clientContext.client
      .authBody(
        Api.app.pcr_api_colab_request_post,
        {},
        { recruit_id: recruit.recruit_id },
        {}
      )
      .then((value) => {
        if (!value.error) return;
        setErr(value.error);
      });
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        borderRadius: "8px",
        padding: "16px",
        color: "#fff",
        // 3列並べ時は不要なので margin は削除/調整
        // margin: "16px 0",
      }}
    >
      <h2 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>
        {recruit.title}
      </h2>
      <p style={{ margin: "4px 0" }}>ID: {recruit.recruit_id}</p>
      <p style={{ margin: "4px 0" }}>説明: {recruit.description}</p>
      <p style={{ margin: "4px 0" }}>作成者: {recruit.creator_id}</p>

      <button
        onClick={handleRequest}
        style={{
          marginTop: "8px",
          padding: "8px 16px",
          background: "#3c6aed",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#2c4ebf")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#3c6aed")}
      >
        リクエスト
      </button>

      {/* 個別のエラーメッセージ */}
      <ErrorMessage error={err} />
    </div>
  );
}
