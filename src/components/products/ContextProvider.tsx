"use client"
import {ProductRes} from '@/(main)/search/sample/ProductRes';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNotification, usePurchaseYesNo} from '~/notification/notification';
import useResponsive from "~/hooks/useResponsive";

// Contextの型定義
interface ProductContextType {
  productId: string;
  isProductOpen: boolean;
  isSidebarOpen: boolean;
  isMobile: boolean;
  isModalOpen: boolean;
  toggleProductWindow: () => void;
  setProductId: (id: string) => void;
  setIsSidebarOpen: (id: boolean) => void;
  setIsMobile: (id: boolean) => void;
  showNotification: (msg: string, product?: ProductRes) => void;
  setIsModalOpen: (id: boolean) => void;
  showPurchaseYesNo: () => void;
}

// 初期値
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Providerコンポーネント
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [productId, setProductId] = useState<string>("none");
  const [isProductOpen, setisProductOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const toggleProductWindow = () => setisProductOpen((prev) => !prev);

  const [notification, showNotification] = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseYesNo, showPurchaseYesNo, purchaseComplete] = usePurchaseYesNo();
  const responsive = useResponsive().type

  useEffect(() => {
    if (responsive != "pc") {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [responsive])

  return (
      <ProductContext.Provider
          value={{
            isProductOpen,
            productId,
            setProductId,
            toggleProductWindow,
            isSidebarOpen,
            setIsSidebarOpen,
            isMobile,
            setIsMobile,
            showNotification,
            isModalOpen,
            setIsModalOpen,
            showPurchaseYesNo,
          }}
      >
        {children}
        {notification}
        {purchaseYesNo}
        {purchaseComplete}
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