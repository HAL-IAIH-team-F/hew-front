import React, {ReactNode} from 'react';
import {FaBell, FaChevronRight, FaSearch, FaSpinner} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import Image from "../../../../util/Image";
import {MdOutlineBubbleChart} from "react-icons/md";
import {iconstyles, styles} from './Styles';
import {useUserData} from '~/api/context/useUserData';
import {useProductContext} from '~/products/ContextProvider';
import {IoCartOutline} from "react-icons/io5";
import useRoutes from "~/route/useRoutes";
import SidebarRoutesLink from "@/(main)/(timeline)/_sidebar/SidebarRoutesLink";
import {useWindowSize} from "@/_hook/useWindowSize";
import {usePathname} from "next/navigation";
import PageWindow from "@/(main)/(timeline)/_sidebar/PageWindow";


type SidebarProps = {
  children?: ReactNode;
};
const Sidebar: React.FC<SidebarProps> = ({children}) => {

  const {
    isSidebarOpen,
    setIsSidebarOpen,
  } = useProductContext();
  const size = useWindowSize()


  const {user} = useUserData();
  const pathname = usePathname()
  const routes = useRoutes();

  return (
    <div>
      <div
        style={isSidebarOpen ? styles(size.width, size.height).sidebar : styles(size.width, size.height).collapsedSidebar}>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles(size.width, size.height).toggleButton}>
          <FaChevronRight
            style={{
              transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              fontSize: '18px',
            }}
          />
        </button>
        <SidebarRoutesLink routeUrl={routes.search()}><FaSearch style={iconstyles.icon}/></SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.notification()}><FaBell style={iconstyles.icon}/></SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.message()}><FaRegMessage style={iconstyles.icon}/></SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.account()}>{user && user.icon ? (
          <Image
            alt="User Icon"
            src={user.icon.strUrl()}
            width={33}
            height={33}
            style={iconstyles.userIcon}
          />
        ) : (
          <FaSpinner style={iconstyles.spinner}/>
        )}</SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.productListing()}><MdOutlineBubbleChart
          style={iconstyles.icon}/></SidebarRoutesLink>
        <SidebarRoutesLink routeUrl={routes.cart()}><IoCartOutline style={iconstyles.icon}/></SidebarRoutesLink>
      </div>

      <PageWindow>
        {children}
      </PageWindow>
    </div>
  );
};


export default Sidebar;
