"use client"
import React from "react";
import UserRegisterForm from "@/(main)/lp/(top)/register/UserRegisterForm";
import LpRegisterContainer from "@/(main)/lp/(top)/register/LpRegisterContainer";

export default function Page(
    {}: {}
) {
    return <>
        <LpRegisterContainer>
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
        </LpRegisterContainer>
    </>
}