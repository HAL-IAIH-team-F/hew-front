import React, {useEffect, useState} from 'react';
import {inAppPageStyle, pageWindowStyle} from './Styles';

import AccountPage from '@/(main)/user/profile/page';
import NotificationPage from '@/(main)/user/notification/page';
import MessagePage from '@/(main)/user/message/page';
import ProductListingForm from '@/(main)/product/listing/ProductListingForm';
import { Manager } from '~/manager/manager';
import SearchPage from '@/(main)/search/search';
import { Productmanager } from '~/manager/ProductManager';

const PageWindow: React.FC<{ isOpen: boolean; isVisible: boolean; value: string, manager:Manager,productManager: Productmanager }> = ({isOpen, isVisible, value, manager, productManager}) => {
  const [isAnimating, setIsAnimating] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div style={pageWindowStyle(isOpen, productManager.value.isWindowOpen, isAnimating)}>
      <div style={inAppPageStyle(isAnimating)}>{renderPageContent(value, manager, productManager)}</div>
    </div>
  );
};

const renderPageContent = (initialTab: string, manager: Manager, productManager: Productmanager) => {

  const [activeTab, setActiveTab] = useState(initialTab);
  
  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab]);

  return (
    <>
      <div style={{display: activeTab === "Search" ? "block" : "none"}}>
        <SearchPage/>
      </div>
      <div style={{display: activeTab === "Notification" ? "block" : "none"}}>
        <NotificationPage/>
      </div>
      <div style={{display: activeTab === "Message" ? "block" : "none"}}>
        <MessagePage/>
      </div>
      <div style={{display: activeTab === "Calendar" ? "block" : "none"}}>
        カレンダーページw
      </div>
      <div style={{display: activeTab === "Account" ? "block" : "none"}}>
        <AccountPage manager={manager} productManager={productManager}/>
      </div>
      <div style={{display: activeTab === "ProductListing" ? "block" : "none"}}>
        <ProductListingForm/>
      </div>
    </>
  );
};

export default PageWindow;
