"use client"
import React, {createContext, useContext, useState} from 'react';

// Contextの型定義
interface ProductContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (id: boolean) => void;
}

// 初期値
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Providerコンポーネント
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <ProductContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};