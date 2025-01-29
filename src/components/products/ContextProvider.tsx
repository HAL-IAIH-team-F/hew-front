"use client"
import { useWindowSize } from '@/_hook/useWindowSize';
import {usePathname, useRouter} from "next/navigation";
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import internal from 'stream';
import {Routes} from "@/Routes";
// Contextの型定義
interface ProductContextType {
  productId: string;
  isProductOpen: boolean;
  isSidebarOpen: boolean;
  isMobile:boolean;
  toggleProductWindow: () => void;
  setProductId: (id: string) => void;
  setIsSidebarOpen: (id: boolean) => void;
  setIsMobile: (id: boolean) => void;
  }

// 初期値
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Providerコンポーネント
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [productId, setProductId] = useState<string>("none");
  const [isProductOpen, setisProductOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isPathTimeline, setIsPathTimeline] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [window, setWindow] = useState<boolean>(false);
  const router = useRouter()
  const pathname = usePathname(); // 現在のURLパスを取得
  const toggleProductWindow = () => setisProductOpen((prev) => !prev);
  const size = useWindowSize()
  useEffect(() => {
    if (pathname !== "/") {
      if (isProductOpen && isMobile)
      {
        setProductId("none")
        setisProductOpen(false)
      }else{
        return setIsPathTimeline(true)
      }
    }else{
      return setIsPathTimeline(true)
    }
    
  },[pathname])
  useEffect(() => {
    if (isMobile && isPathTimeline && isProductOpen) {
      router.push(Routes.timeline)
      console.log("a")
    }
    console.log(isMobile,isPathTimeline,isProductOpen)
  }, [size, isProductOpen, isSidebarOpen]);

  useEffect(() => {
    if (size.width <= 900) {
      setIsMobile(true)
      console.log(size.width)
    }else{
      setIsMobile(false)
    }
  },[size])

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