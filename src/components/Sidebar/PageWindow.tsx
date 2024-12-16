import React, {useEffect, useState} from 'react';
import {inAppPageStyle, pageWindowStyle} from './Styles';
import SearchPage from '@/search/search';
import AccountPage from '@/user/profile/page';
import NotificationPage from '@/user/notification/page';
import MessagePage from '@/user/message/page';
import ProductListingForm from '@/product/listing/ProductListingForm';
import { Manager } from '~/manager/manager';

const PageWindow: React.FC<{ isOpen: boolean; ProductisOpen:boolean; isVisible: boolean; value: string, manager:Manager }> = ({isOpen, ProductisOpen, isVisible, value, manager}) => {
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
    <div style={pageWindowStyle(isOpen, ProductisOpen, isAnimating)}>
      <div style={inAppPageStyle(isAnimating)}>{renderPageContent(value,manager)}</div>
    </div>
  );
};

const renderPageContent = (initialTab: string, manager: Manager) => {
  
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
        <AccountPage manager={manager}/>
      </div>
      <div style={{display: activeTab === "ProductListing" ? "block" : "none"}}>
        <ProductListingForm/>
      </div>
    </>
  );
};

export default PageWindow;
