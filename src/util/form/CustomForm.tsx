"use client";
import * as React from "react";
import {createContext, DetailedHTMLProps, FormHTMLAttributes, ReactNode, useState} from "react";

// エラーコンテキストの作成
export namespace FormState {
  export const Context = createContext<FormError | undefined>(undefined);
}

export type FormError = { [key: string]: string };

export interface CustomFormProps {
  children: ReactNode
  className: string
  action?: (formData: FormData) => Promise<FormError | undefined>;
}

export function CustomForm({
  action,
  children,
  className,
  ...props
}: CustomFormProps) {
  // エラーメッセージの状態管理
  const [formError, setFormError] = useState<FormError | undefined>();

  // フォーム送信時の処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ページリロードを防止
    const formData = new FormData(event.currentTarget); // フォームデータを取得

    // action関数があれば非同期で実行し、エラーが返れば状態を更新
    if (action) {
      const error = await action(formData);
      setFormError(error); // エラーメッセージをセット
    }
  };

  return (
    <FormState.Context.Provider value={formError}>
      <form
        className={className} // クラス名の受け渡し
        {...props}
        onSubmit={handleSubmit} // フォーム送信時の処理
      >
        {/* フォーム内にエラーがあれば表示 */}
        {formError && formError["form"] && (
          <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
            {formError["form"]}
          </div>
        )}

        {/* フォームのコンテンツ */}
        {children}

        {/* エラーがあれば再度表示（この例では2回目の表示は省略） */}
      </form>
    </FormState.Context.Provider>
  );
}

