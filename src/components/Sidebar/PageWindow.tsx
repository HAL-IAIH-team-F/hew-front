"use client"
import React, {ReactNode, useEffect} from 'react';
import {inAppPageStyle, pageWindowStyle} from './Styles';
import {useProductContext} from '~/products/ContextProvider';

const PageWindow: React.FC<{
  children?: ReactNode
}> = (
  {children}
) => {
  const {
    isWindowOpen,
    isProductOpen,
    setisProductOpen,
    setIsVisible,
    isVisible,
    productId,
    setProductId,
    toggleWindow,
    isSidebarOpen,
    setIsSidebarOpen,
    isPagevalue,
    setPageValue,
    setIsAnimating,
  } = useProductContext();


  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  return (
    <div style={pageWindowStyle(isSidebarOpen, isProductOpen, children != undefined)}>
      <div style={inAppPageStyle(children != undefined)}>
        <div style={{display: "block"}} className={"h-full"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWindow;
