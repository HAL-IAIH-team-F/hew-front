// ============================
// util/form/StyledSearchInput.tsx
// Author: injectxr
// Date: 2024-09-09
// Description: 検索バーの関数コンポーネント
// ============================

import React from "react";
import { sx } from "../util";

export interface SearchInputProps {
  name: string;
  placeholder: string;
  value: string; // 追加
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 追加
  onSearch: () => void;
}

export function StyledSearchInput({ name, placeholder, value, onChange, onSearch }: SearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value} // バインド
        onChange={onChange} // バインド
        className={sx(
          "w-full px-4 py-3 pr-14 border rounded-full text-lg",
          "border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
          "transition-all duration-300"
        )}
      />
      <button
        type="button"
        onClick={onSearch}
        className={sx(
          "absolute right-2 top-1/2 transform -translate-y-1/2",
          "text-blue-700 border border-blue-700 hover:bg-gray-500 hover:text-white focus:ring-4",
          "focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center",
          "inline-flex items-center dark:border-blue-500 dark:text-blue-500",
          "dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-gray-500"
        )}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.42-1.42l3.37 3.37a1 1 0 11-1.42 1.42l-3.37-3.37zM8 14a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">検索</span>
      </button>
    </div>
  );
}
