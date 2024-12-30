import React, { createContext, useState, useContext } from 'react';

// Contextの型定義
interface ProductContextType {
    productId: string;
    isWindowOpen: boolean;
    isProductOpen: boolean;
    isVisible: boolean;
    isSidebarOpen: boolean;
    isAnimating: boolean;
    isPagevalue: string;
    toggleWindow: () => void;
    toggleProductWindow: ()=> void;
    setisProductOpen: (id: boolean) => void;
    setProductId: (id: string) => void;
    setIsVisible: (id: boolean) => void;
    setIsSidebarOpen: (id: boolean) => void;
    setIsAnimating: (id: boolean) => void;
    setPageValue: (id: string) => void;
}

// 初期値
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Providerコンポーネント
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [productId, setProductId] = useState<string>("none");
    const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
    const [isProductOpen, setisProductOpen] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isPagevalue, setPageValue] = useState<string>('undefined');
    
    const toggleWindow = () => setIsWindowOpen((prev) => !prev);
    const toggleProductWindow = () => setisProductOpen((prev) => !prev);

    return (
        <ProductContext.Provider
            value={{
                isWindowOpen,
                isProductOpen,
                setisProductOpen,
                setIsVisible,
                isVisible,
                isAnimating,
                isPagevalue,
                productId,
                setProductId,
                toggleWindow,
                toggleProductWindow,
                isSidebarOpen,
                setIsSidebarOpen,
                setIsAnimating,
                setPageValue,            }}
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