"use client"
import React from "react";
import UserRegisterForm from "@/(main)/lp/(top)/register/UserRegisterForm";
import {useClientState} from "~/api/context/ClientContextProvider";

export default function Page(
    {}: {}
) {
    const clientState = useClientState()
    return <>
        <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "UDEVGothic, sans-serif",
            opacity: 1,
            zIndex: 6,
            overflow: "hidden", // 子要素がはみ出ないようにする
             ...(clientState.state == "unregistered" ? {
                 opacity: 1,
                 visibility: "visible",
                 transition: "opacity 2s ease-in, visibility 2s ease-in",
             } : {})}}>
            <div style={{
                textAlign: "center",
                padding: "20px",
                borderRadius: "8px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                maxWidth: "90vw", // 親要素を超えない最大幅
                maxHeight: "90vh", // 親要素を超えない最大高さ
                overflow: "auto", // コンテンツが大きい場合はスクロール
                boxSizing: "border-box", // サイズ計算にパディングを含む
            }}>
                <UserRegisterForm/>
            </div>
        </div>
    </>
}