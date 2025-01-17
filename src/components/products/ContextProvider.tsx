"use client"
import React, {createContext, useContext, useState} from 'react';

// Contextの型定義
interface ProductContextType {
  productId: string;
  isProductOpen: boolean;
  isSidebarOpen: boolean;
  toggleProductWindow: () => void;
  setProductId: (id: string) => void;
  setIsSidebarOpen: (id: boolean) => void;
  }

// 初期値
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Providerコンポーネント
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [productId, setProductId] = useState<string>("none");
  const [isProductOpen, setisProductOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleProductWindow = () => setisProductOpen((prev) => !prev);

  return (
    <ProductContext.Provider
      value={{
        isProductOpen,
        productId,
        setProductId,
        toggleProductWindow,
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