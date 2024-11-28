import React, { useEffect, useMemo, useState } from 'react';
import { pageWindowStyle, WindowPageStyle } from './Styles';
import SearchPage from '@/search/search';


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
      <div style={WindowPageStyle}>{renderPageContent(value)}</div>
    </div>
  );
};


// searchPageRef ここがまじでだめ ほんとに

const renderPageContent = (value: string) => {
    const pageContent = useMemo(() => {
        switch (value) {
          case "Search":
            return <SearchPage />;
          case "Notification":
            return <div>通知w</div>;
          case "Bubbles":
            return <div>泡ページw</div>;
          case "Message":
            return <div>メッセージページw</div>;
          case "Calendar":
            return <div>カレンダーページw</div>;
          case "Account":
            return <div>アカウントページw</div>;
          default:
            return <div>error 114514</div>;
        }
      }, [value]); 
    return <>{pageContent}</>;
};

export default PageWindow;
