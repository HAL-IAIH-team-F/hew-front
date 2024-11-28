import React, { useState, useEffect } from 'react';
import { FaChevronRight, FaSpinner, FaBell, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { GiBubbles } from 'react-icons/gi';
import { FaRegMessage } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import Image from "../../util/Image";
import PageWindow from './PageWindow';
import { iconContainerStyle, styles } from './Styles';
import { useUserData } from '~/api/useUserData';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState<string>('undefined');

  const { user } = useUserData();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const togglePageWindow = () => setIsVisible(!isVisible);
  const changePageWindow = (newValue: string | undefined) => setValue(newValue ?? 'undefined');

  return (
    <div>
      <div style={isOpen ? styles.sidebar : styles.collapsedSidebar}>
        <button onClick={toggleSidebar} style={styles.toggleButton}>
          <FaChevronRight
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              fontSize: '18px',
            }}
          />
        </button>

        {/* アイコンボタン */}
        {['Bubbles', 'Search', 'Notification', 'Message', 'Calendar', 'Account'].map((item) => (
          <button
            key={item}
            style={iconContainerStyle(isOpen)}
            onClick={() => {
              togglePageWindow();
              changePageWindow(item);
            }}
          >
            {renderIcon(item,user)}
          </button>
        ))}
      </div>
      <PageWindow isOpen={isOpen} isVisible={isVisible} value={value} />
    </div>
  );
};

// アイコンを描画する関数
const renderIcon = (item: string,user: any) => {
  switch (item) {
    case 'Bubbles': return <GiBubbles style={styles.icon} />;
    case 'Search': return <FaSearch style={styles.icon} />;
    case 'Notification': return <FaBell style={styles.icon} />;
    case 'Message': return <FaRegMessage style={styles.icon} />;
    case 'Calendar': return <FaCalendarAlt style={styles.icon} />;
    case 'Account':
      return user && user.icon ? (
        <Image
          alt="User Icon"
          src={user.icon.strUrl()} 
          width={33} 
          height={33}
          style={styles.userIcon}
        />
      ) : (
        <FaSpinner style={styles.spinner} />
      );
    default: return null;
  }
};

export default Sidebar;
