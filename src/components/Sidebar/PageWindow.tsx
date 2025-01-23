"use client"
import React, {ReactNode} from 'react';
import {inAppPageStyle, pageWindowStyle} from './Styles';
import {useProductContext} from '~/products/ContextProvider';
import { useWindowSize } from '@/_hook/useWindowSize';

const PageWindow: React.FC<{
  children?: ReactNode
}> = (
  {children}
) => {
  const {
    isProductOpen,
    isSidebarOpen,
  } = useProductContext();
  const size = useWindowSize()
  return (
    <div style={pageWindowStyle(isSidebarOpen, isProductOpen, children != undefined,size.width,size.height)}>
      <div style={inAppPageStyle(children != undefined)}>
        <div style={{display: "block"}} className={"h-full"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWindow;
