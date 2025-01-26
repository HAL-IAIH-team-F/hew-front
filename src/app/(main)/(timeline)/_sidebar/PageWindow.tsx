"use client"
import React, {ReactNode} from 'react';
import {inAppPageStyle, pageWindowStyle} from './Styles';
import {useProductContext} from '~/products/ContextProvider';
import useProductId from "~/products/useProductId";

const PageWindow: React.FC<{
  children?: ReactNode
}> = (
  {children}
) => {
  const {
    isSidebarOpen,
  } = useProductContext();
  const productId = useProductId()

  return (
    <div style={pageWindowStyle(isSidebarOpen, productId != undefined, children != undefined)}>
      <div style={inAppPageStyle(children != undefined)}>
        <div style={{display: "block"}} className={"h-full"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWindow;
