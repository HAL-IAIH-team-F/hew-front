// ============================
// util/form/StyledCategoryButton.tsx
// Author: injectxr
// Date: 2024-09-09
// Description: カテゴリーボタンの関数コンポーネント
// ============================
import React from "react";
import { sx } from "../util";

export interface CategoryButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function StyledCategoryButton({ label, isSelected, onClick }: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={sx(
        "px-4 py-2 text-center transition-all font-bold", // 太字にするため font-bold を追加
        isSelected ? "border-b-4 border-blue-500 text-blue-500" : "border-b-4 border-transparent text-gray-400", // デフォルト文字色を slate-700 に設定
        "hover:text-black", // hover時に文字色を黒色に変更
      )}
    >
      {label}
    </button>
  );
}
