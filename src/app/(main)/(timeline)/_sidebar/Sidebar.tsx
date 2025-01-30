import React, {ReactNode} from 'react';
import {FaBell, FaChevronRight, FaSearch, FaSpinner} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import Image from "../../../../util/Image";
import {MdOutlineBubbleChart} from "react-icons/md";
import PageWindow from './PageWindow';
import {styles} from './Styles';
import {useUserData} from '~/api/context/useUserData';
import {useProductContext} from '~/products/ContextProvider';
import {IoCartOutline} from "react-icons/io5";
import useRoutes from "~/route/useRoutes";
import SidebarRoutesLink from "@/(main)/(timeline)/_sidebar/SidebarRoutesLink";


type SidebarProps = {
  children?: ReactNode;
};
const Sidebar: React.FC<SidebarProps> = ({children}) => {

  const {
    isSidebarOpen,
    setIsSidebarOpen,
  } = useProductContext();


  const {user} = useUserData();
  const routes = useRoutes();

  return (
    <div>
      <div style={isSidebarOpen ? styles.sidebar : styles.collapsedSidebar}>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.toggleButton}>
          <FaChevronRight
            style={{
              transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              fontSize: '18px',
            }}
          />
        </button>
        <SidebarRoutesLink routeUrl={routes.search()}><FaSearch style={styles.icon}/></SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.notification()}><FaBell style={styles.icon}/></SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.message()}><FaRegMessage style={styles.icon}/></SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.account()}>{user && user.icon ? (
          <Image
            alt="User Icon"
            src={user.icon.strUrl()}
            width={33}
            height={33}
            style={styles.userIcon}
          />
        ) : (
          <FaSpinner style={styles.spinner}/>
        )}</SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.productListing()}><MdOutlineBubbleChart
          style={styles.icon}/></SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.cart()}><IoCartOutline style={styles.icon}/></SidebarRoutesLink>
      </div>

      <PageWindow>
        {children}
      </PageWindow>
    </div>
  );
};


export default Sidebar;
