"use client"
import React from 'react';
import {FaBell, FaChevronRight, FaPray, FaSearch, FaSpinner} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import {MdOutlineBubbleChart} from "react-icons/md";
import {useUserData} from '~/api/context/useUserData';
import {useProductContext} from '~/products/ContextProvider';
import {IoCartOutline} from "react-icons/io5";
import useRoutes from "~/route/useRoutes";
import SidebarRoutesLink from "@/(main)/(timeline)/_window/_sidebar/SidebarRoutesLink";
import {useWindowSize} from "@/_hook/useWindowSize";
import {iconstyles, styles} from "@/(main)/(timeline)/_window/_sidebar/Styles";
import Image from "../../../../../util/Image";
import {usePathname} from 'next/navigation';


type SidebarProps = {};
const Sidebar: React.FC<SidebarProps> = ({}) => {

    const {
        isSidebarOpen,
        setIsSidebarOpen,
    } = useProductContext();
    const size = useWindowSize()
    const {user} = useUserData();
    const routes = useRoutes();
    const pathname = usePathname()

    return (
        <div>
            <div
                style={isSidebarOpen ? styles(size.width, size.height).sidebar : styles(size.width, size.height).collapsedSidebar}>

                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={styles(size.width, size.height).toggleButton}>
                    <FaChevronRight
                        style={{
                            transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                            fontSize: '18px',
                        }}
                    />
                </button>
                <SidebarRoutesLink routeUrl={routes.search()}><FaSearch style={iconstyles.icon}/></SidebarRoutesLink>
                <SidebarRoutesLink routeUrl={routes.notification()}><FaBell
                    style={iconstyles.icon}/></SidebarRoutesLink>
                <SidebarRoutesLink routeUrl={routes.message()}><FaRegMessage
                    style={iconstyles.icon}/></SidebarRoutesLink>
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
                <SidebarRoutesLink routeUrl={routes.colablisting()}><FaPray
                    style={iconstyles.icon}/></SidebarRoutesLink>
            </div>
        </div>
    );
};


export default Sidebar;
