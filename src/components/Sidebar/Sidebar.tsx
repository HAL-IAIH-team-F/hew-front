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
import {joinToTimelinePath, TIMELINE_PATH} from "@/(main)/(timeline)/timeline";


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

        {['Search', 'Notification', 'Message', 'Account', "ProductListing"].map((item) => (
          <Link
            key={item}
            style={iconContainerStyle(isSidebarOpen)}
            onClick={(event) => {
              if (pathname == TIMELINE_PATH) return
              if (joinToTimelinePath(item.toLowerCase()) == pathname) return
              event.preventDefault()
              router.push(`${TIMELINE_PATH}`)
              setTimeout(() => {
                router.push(joinToTimelinePath(item.toLowerCase()))
              }, 300);
            }}
            href={joinToTimelinePath(item.toLowerCase()) == pathname ? TIMELINE_PATH : joinToTimelinePath(item.toLowerCase())}
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
