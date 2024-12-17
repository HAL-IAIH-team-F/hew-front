import React, {useState} from 'react';
import {FaBell, FaCalendarAlt, FaChevronRight, FaSearch, FaSpinner} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import Image from "../../util/Image";
import {MdOutlineBubbleChart} from "react-icons/md";
import PageWindow from './PageWindow';
import {iconContainerStyle, styles} from './Styles';
import { Manager } from '~/manager/manager';
import { Productmanager } from '~/manager/ProductManager';
import ProductWindows from '~/products/RightProductWindows';
import {useUserData} from '~/api/context/useUserData';


type SidebarProps = {
  manager: Manager;
  productManager: Productmanager
};
const Sidebar: React.FC<SidebarProps> = ({ manager,productManager }) => {
 
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState<string>('undefined');
  const {user} = useUserData();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const changePageWindow = (newValue: string | undefined) => setValue(newValue ?? 'undefined');

  function checkPageValue(newValue: string | undefined) {
    if (isSamePage(newValue)) {
      handleSamePage();
      return;
    }

    if (isUndefinedPage()) {
      handleUndefinedPage(newValue);
      return;
    }

    handleDifferentPage(newValue);
  }

  function isSamePage(newValue: string | undefined): boolean {
    return value === newValue;
  }

  function isUndefinedPage(): boolean {
    return value === "undefined";
  }

  function handleSamePage() {
    togglePageWindow();
  }

  function handleUndefinedPage(newValue: string | undefined) {
    changePageWindow(newValue);
    togglePageWindow();
  }

  async function handleDifferentPage(newValue: string | undefined) {
    await togglePageWindow();
    changePageWindow("undefined");

    if (newValue) {
      setTimeout(() => {
        changePageWindow(newValue);
        setIsVisible(true);
      }, 300);
    }
  }

  function togglePageWindow(): Promise<void> {
    return new Promise((resolve) => {
      setIsVisible(!isVisible);
      setTimeout(resolve, 300);
    });
  }

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

        {['Search', 'Notification', 'Message', 'Calendar', 'Account', "ProductListing"].map((item) => (
          <button
            key={item}
            style={iconContainerStyle(isOpen)}
            onClick={() => {
              checkPageValue(item);
            }}
          >
            {renderIcon(item, user)}
          </button>
        ))}
      </div>
      
      <PageWindow isOpen={isOpen} isVisible={isVisible} value={value} manager={manager} productManager={productManager}/>
      <ProductWindows
        manager={manager}
        productManager= {productManager}
      />
    </div>
  );
};

const renderIcon = (item: string, user: any) => {
  switch (item) {
    case 'Search':
      return <FaSearch style={styles.icon}/>;
    case 'Notification':
      return <FaBell style={styles.icon}/>;
    case 'Message':
      return <FaRegMessage style={styles.icon}/>;
    case 'Calendar':
      return <FaCalendarAlt style={styles.icon}/>;
    case 'ProductListing':
      return <MdOutlineBubbleChart style={styles.icon}/>;
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
        <FaSpinner style={styles.spinner}/>
      );

    default:
      return null;
  }
};

export default Sidebar;
