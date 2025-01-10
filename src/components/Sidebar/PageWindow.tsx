import React, {useEffect, useState} from 'react';
import {inAppPageStyle, pageWindowStyle} from './Styles';

import AccountPage from '@/(main)/user/profile/page';
import NotificationPage from '@/(main)/user/notification/page';
import ChatModal from '@/(main)/user/chat/ChatModal';
import ProductListingForm from '@/(main)/product/listing/ProductListingForm';
import { Manager } from '~/manager/manager';
import SearchPage from '@/(main)/search/search';
import { useProductContext } from '~/products/ContextProvider';

const PageWindow: React.FC<{ manager:Manager }> = ({manager}) => {
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
      isAnimating,
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
    <div style={pageWindowStyle(isSidebarOpen, isProductOpen, isAnimating)}>
      <div style={inAppPageStyle(isAnimating)}>{renderPageContent(manager)}</div>
    </div>
  );
};

const renderPageContent = (manager: Manager ) => {
  const {
    isPagevalue,
  } = useProductContext();
  const [activeTab, setActiveTab] = useState(isPagevalue);
  
  useEffect(() => {
    setActiveTab(isPagevalue)
  }, [isPagevalue]);

  return (
    <>
      <div style={{display: activeTab === "Search" ? "block" : "none"}}>
        <SearchPage/>
      </div>
      <div style={{display: activeTab === "Notification" ? "block" : "none"}} className={"h-full"}>
        <NotificationPage/>
      </div>
      <div style={{display: activeTab === "Message" ? "block" : "none"}} className={"h-full"}>
        <ChatModal/>
      </div>
      <div style={{display: activeTab === "Calendar" ? "block" : "none"}}>
        カレンダーページw
      </div>
      <div style={{display: activeTab === "Account" ? "block" : "none"}}>
        <AccountPage manager={manager}/>
      </div>
      <div style={{display: activeTab === "ProductListing" ? "block" : "none"}} className={"h-full"}>
        <ProductListingForm/>
      </div>
    </>
  );
};

export default PageWindow;
