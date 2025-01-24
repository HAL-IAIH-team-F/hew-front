import React, {ReactNode} from 'react';
import {FaBell, FaChevronRight, FaSearch, FaSpinner} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import Image from "../../util/Image";
import {MdOutlineBubbleChart} from "react-icons/md";
import PageWindow from './PageWindow';
import {iconContainerStyle, styles} from './Styles';
import {useUserData} from '~/api/context/useUserData';
import {useProductContext} from '~/products/ContextProvider';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Routes} from "@/Routes";
import { IoCartOutline } from "react-icons/io5";
import { FaPray } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

type SidebarProps = {
  children?: ReactNode;
};
const Sidebar: React.FC<SidebarProps> = ({children}) => {

  const {
    isSidebarOpen,
    setIsSidebarOpen,
  } = useProductContext();


  const {user} = useUserData();
  const pathname = usePathname()


  const router = useRouter()

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

        {['Search', 'Notification', 'Message', 'Account', "ProductListing","Cart", "RecruitColab", "ColabListing"].map((item) => (
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
      return <FaSearch style={styles.icon}/>;
    case 'Notification':
      return <FaBell style={styles.icon}/>;
    case 'Message':
      return <FaRegMessage style={styles.icon}/>;
    case 'ProductListing':
      return <MdOutlineBubbleChart style={styles.icon}/>;
    case 'RecruitColab':
      return <FaPray style={styles.icon}/>;
    case 'ColabListing':
      return <IoPeople style={styles.icon}/>;
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
    case "Cart":
      return <IoCartOutline style={styles.icon}/>;

    default:
      return null;
  }
};

export default Sidebar;
