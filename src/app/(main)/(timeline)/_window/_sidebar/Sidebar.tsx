"use client"
import React, {useEffect, useState} from 'react';
import {FaBell, FaSearch, FaSpinner} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import {useUserData} from '~/api/context/useUserData';
import {useProductContext} from '~/products/ContextProvider';
import {IoCartOutline} from "react-icons/io5";
import useRoutes from "~/route/useRoutes";
import SidebarRoutesLink from "@/(main)/(timeline)/_window/_sidebar/SidebarRoutesLink";
import {useWindowSize} from "@/_hook/useWindowSize";
import {iconstyles, selectedRouteStyle, styles} from "@/(main)/(timeline)/_window/_sidebar/Styles";
import Image from "../../../../../util/Image";
import {usePathname} from 'next/navigation';
import {Handshake, House, ImagePlus} from "lucide-react";

type SidebarProps = {};
const Sidebar: React.FC<SidebarProps> = ({}) => {

  const {
    isSidebarOpen,
    setIsSidebarOpen,
  } = useProductContext();
  const size = useWindowSize()
  const user = useUserData();
  const routes = useRoutes();
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTransitions, setTransitions] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSidebarOpen(true);
    }, 3000);

    return () => clearTimeout(timer); // クリーンアップ
  }, []);


  useEffect(() => {
    if (isTransitions) return
    if (pathname === "/") return setActiveIndex(0)
    if (pathname.startsWith("/account")) return setActiveIndex(1)
    if (pathname === "/search") return setActiveIndex(2)
    if (pathname === "/notification") return setActiveIndex(3)
    if (pathname === "/message") return setActiveIndex(4)
    if (pathname === "/product/listing") return setActiveIndex(5)
    if (pathname === "/cart") return setActiveIndex(6)
    if (pathname === "/colablisting") return setActiveIndex(7)
  }, [pathname]);


  return (
      <div>
        <div
            style={isSidebarOpen ? styles(size.width, size.height).sidebar : styles(size.width, size.height).collapsedSidebar}>

          <div style={{height: "100%", boxSizing: "border-box", position: "relative"}}>
            {/* 背景のアニメーションを適用 */}
            {activeIndex !== null && (

                <div style={{...selectedRouteStyle, boxSizing: "border-box", top: `calc(${activeIndex * 12.5}%)`}}>
                  <div style={{
                    height: "100%",
                    marginTop: "-12px",
                    padding: "12px 0",
                    backgroundColor: "rgb(255, 255, 255,0.4)",
                    borderRadius: '60px',
                    border: '1px solid rgb(255, 255, 255,0.4)'
                  }}>

                  </div>
                </div>
            )}

            <SidebarRoutesLink routeUrl={routes.timeline()} setTransitions={setTransitions}><House
                style={iconstyles.icon}/></SidebarRoutesLink>
            <SidebarRoutesLink routeUrl={routes.account.account()}
                               setTransitions={setTransitions}>{user && user.icon ? (
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
            <SidebarRoutesLink routeUrl={routes.search()} setTransitions={setTransitions}><FaSearch
                style={iconstyles.icon}/></SidebarRoutesLink>
            <SidebarRoutesLink routeUrl={routes.notification()} setTransitions={setTransitions}><FaBell
                style={iconstyles.icon}/></SidebarRoutesLink>
            <SidebarRoutesLink routeUrl={routes.message()} setTransitions={setTransitions}><FaRegMessage
                style={iconstyles.icon}/></SidebarRoutesLink>

            <SidebarRoutesLink routeUrl={routes.productListing()} setTransitions={setTransitions}><ImagePlus
                style={iconstyles.icon}/></SidebarRoutesLink>
            <SidebarRoutesLink routeUrl={routes.cart()} setTransitions={setTransitions}><IoCartOutline
                style={iconstyles.icon}/></SidebarRoutesLink>
            <SidebarRoutesLink routeUrl={routes.colab.recruit()} setTransitions={setTransitions}><Handshake
                style={iconstyles.icon}/></SidebarRoutesLink>

          </div>
        </div>
      </div>
  );
};


export default Sidebar;
