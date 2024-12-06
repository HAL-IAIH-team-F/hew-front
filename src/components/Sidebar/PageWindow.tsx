import React, { useEffect, useMemo, useState } from 'react';
import { inAppPageStyle, pageWindowStyle} from './Styles';
import SearchPage from '@/search/search';
import { el } from 'date-fns/locale';
import AccontPage from '@/user/profile/page';
import NotificationPage from '@/user/notification/page';
import MessagePage from '@/user/message/page';
import ProductListingForm from '@/product/listing/ProductListingForm';


const PageWindow: React.FC<{ isOpen: boolean; isVisible: boolean; value: string }> = ({ isOpen, isVisible, value }) => {
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
    <div style={pageWindowStyle(isOpen, isAnimating)}>
      <div style={inAppPageStyle(isAnimating)}>{renderPageContent(value)}</div>
    </div>
  );
};

const renderPageContent = (initialTab: string) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  useEffect(() => {
      setActiveTab(initialTab)
  }, [initialTab]); 

  return (
    <>
      <div style={{ display: activeTab === "Search" ? "block" : "none" }}>
        <SearchPage />
      </div>
      <div style={{ display: activeTab === "Notification" ? "block" : "none" }}>
        <NotificationPage />
      </div>
      <div style={{ display: activeTab === "Message" ? "block" : "none" }}>
        <MessagePage />
      </div>
      <div style={{ display: activeTab === "Calendar" ? "block" : "none" }}>
        カレンダーページw
      </div>
      <div style={{ display: activeTab === "Account" ? "block" : "none" }}>
        <AccontPage />
      </div>
      <div style={{ display: activeTab === "ProductListing" ? "block" : "none" }}>
        <ProductListingForm/>
      </div>
    </>
  );
};

export default PageWindow;
