import React, {ReactNode, useEffect} from 'react';
import {FaBell, FaChevronRight, FaSearch, FaSpinner} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import Image from "../../util/Image";
import {MdOutlineBubbleChart} from "react-icons/md";
import PageWindow from './PageWindow';
import {iconContainerStyle, iconstyles, styles} from './Styles';
import {useUserData} from '~/api/context/useUserData';
import {useProductContext} from '~/products/ContextProvider';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Routes} from "@/Routes";
import { IoCartOutline } from "react-icons/io5";
import { useWindowSize } from '@/_hook/useWindowSize';



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
  

  const router = useRouter()

  return (
    <div>
      <div style={isSidebarOpen ? styles(size.width, size.height).sidebar : styles(size.width, size.height).collapsedSidebar}>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles(size.width, size.height).toggleButton}>
          <FaChevronRight
            style={{
              transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              fontSize: '18px',
            }}
          />
        </button>

        {['Search', 'Notification', 'Message', 'Account', "ProductListing","Cart"].map((item) => (
          <Link
            key={item}
            style={iconContainerStyle(isSidebarOpen)}
            onClick={(event) => {
              if (pathname == Routes.timeline) return
              if (Routes.joinToTimelinePath(item.toLowerCase()) == pathname) return
              event.preventDefault()
              router.push(Routes.timeline)
              setTimeout(() => {
                router.push(Routes.joinToTimelinePath(item.toLowerCase()))
              }, 300);
            }}
            href={Routes.joinToTimelinePath(item.toLowerCase()) == pathname ? Routes.timeline : Routes.joinToTimelinePath(item.toLowerCase())}
          >
            {renderIcon(item, user)}
          </Link>
        ))}
      </div>

      <PageWindow>
        {children}
      </PageWindow>
    </div>
  );
};

const renderIcon = (item: string, user: any) => {
  switch (item) {
    case 'Search':
      return <FaSearch style={iconstyles.icon}/>;
    case 'Notification':
      return <FaBell style={iconstyles.icon}/>;
    case 'Message':
      return <FaRegMessage style={iconstyles.icon}/>;
    case 'ProductListing':
      return <MdOutlineBubbleChart style={iconstyles.icon}/>;
    case 'Account':
      return user && user.icon ? (
        <Image
          alt="User Icon"
          src={user.icon.strUrl()}
          width={33}
          height={33}
          style={iconstyles.userIcon}
        />
      ) : (
        <FaSpinner style={iconstyles.spinner}/>
      );
    case "Cart":
      return <IoCartOutline style={iconstyles.icon}/>;

    default:
      return null;
  }
};

export default Sidebar;
