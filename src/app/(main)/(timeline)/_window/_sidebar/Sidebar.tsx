"use client"
import React, {useEffect, useState} from 'react';
import {FaBell, FaSearch, FaSpinner, FaUserSlash} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import {useUserData} from '~/api/context/useUserData';
import {useProductContext} from '~/products/ContextProvider';
import {IoCartOutline} from "react-icons/io5";
import useRoutes from "~/route/useRoutes";
import SidebarRoutesLink from "@/(main)/(timeline)/_window/_sidebar/SidebarRoutesLink";
import {iconstyles} from "@/(main)/(timeline)/_window/_sidebar/Styles";
import Image from "../../../../../util/Image";
import {usePathname} from 'next/navigation';
import {Handshake, House, ImagePlus} from "lucide-react";
import {useClientState} from '~/api/context/ClientContextProvider';
import useResponsive from "~/hooks/useResponsive";
import {Theme} from "@/Theme";
import {sx} from "../../../../../util/util";

type SidebarProps = {};
const Sidebar: React.FC<SidebarProps> = ({}) => {

  const {
    isSidebarOpen,
    setIsSidebarOpen,
  } = useProductContext();
  const responsive = useResponsive()
  const user = useUserData();
  const routes = useRoutes();
  const pathname = usePathname()
  const clientState = useClientState()
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
    if (pathname.startsWith("/colab")) return setActiveIndex(7)
  }, [pathname]);

  console.debug("Sidebar Rendered", responsive,
      responsive == "phone" ? (
          "w-full overflow-x-scroll left-0 " +
          (isSidebarOpen ?
              "bottom-0" :
              "bottom-[-170px] backdrop-blur-lg")
      ) : (
          "py-[30px] pl-[30px] h-full top-0 overflow-y-scroll " +
          (isSidebarOpen ?
              "left-0" :
              "left-[-170px] backdrop-blur-lg")
      ))
  return (
      <div
          className={sx(
              "fixed z-30",
              isSidebarOpen ? "" : "opacity-0",
              responsive == "phone" ? (
                  "w-full overflow-x-scroll left-0 " +
                  (isSidebarOpen ?
                      "bottom-0" :
                      "bottom-[-170px] backdrop-blur-lg")
              ) : (
                  "py-[30px] pl-[30px] h-full top-0 overflow-y-scroll " +
                  (isSidebarOpen ?
                      "left-0" :
                      "left-[-170px] backdrop-blur-lg")
              ),
          )}
          style={{
            transition: "left 0.3s ease, bottom 0.3s ease, height 0.3s ease, backdrop-filter 0.3s ease"
          }}
      >
        <div
            style={{
              backgroundColor: Theme.bg,
              backdropFilter: 'blur(0px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'left 0.3s ease, height 0.3s ease, backdrop-filter 0.3s ease',
            }}
            className={sx(
                "",
                responsive == "phone" ?
                    "h-[80px] w-[700px] px-[30px]" :
                    "h-full w-[80px] rounded-full py-[30px] min-h-[700px]"
            )}
        >

          <div style={{height: "100%", boxSizing: "border-box", position: "relative"}}
               className={sx(
                   "flex",
                   responsive == "phone" ?
                       "flex-row" :
                       "flex-col"
               )}
          >
            {/* 背景のアニメーションを適用 */}
            {activeIndex !== null && (

                <div style={{
                  position: "absolute",
                  transition: "top 0.3s ease-in-out, left 0.3s ease-in-out",
                  zIndex: -1, // アイコンの下に配置
                  boxSizing: "border-box", ...(
                      responsive == "phone" ? {
                        left: `${activeIndex * 12.5}%`,
                        top: "50%",
                        transform: 'translateY(-50%)',
                        height: "65px",
                        width: "calc(12.5% + 24px)",
                      } : {
                        top: `${activeIndex * 12.5}%`,
                        left: "50%",
                        transform: 'translateX(-50%)',
                        width: "65px",
                        height: "calc(12.5% + 24px)",
                      }
                  )
                }}>
                  <div style={{
                    backgroundColor: "rgb(255, 255, 255,0.4)",
                    borderRadius: '60px',
                    border: '1px solid rgb(255, 255, 255,0.4)', ...(
                        responsive == "phone" ? {
                          width: "100%",
                          height: "100%",
                          marginLeft: "-12px",
                          padding: "0 12px",
                        } : {
                          height: "100%",
                          width: "100%",
                          marginTop: "-12px",
                          padding: "12px 0",
                        }
                    )
                  }}/>
                </div>
            )}

            <SidebarRoutesLink routeUrl={routes.timeline()} setTransitions={setTransitions}><House
                style={iconstyles.icon}/></SidebarRoutesLink>
            <SidebarRoutesLink routeUrl={routes.account.account()}
                               setTransitions={setTransitions}>
              {clientState.state !== "registered" ? (
                  <FaUserSlash className="text-white" style={iconstyles.userIcon}/>

              ) : user && user.icon ? (
                  <Image
                      alt="User Icon"
                      src={user.icon.strUrl()}
                      width={33}
                      height={33}
                      style={iconstyles.userIcon}
                  />
              ) : (
                  <FaSpinner style={iconstyles.spinner}/>
              )}
            </SidebarRoutesLink>
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
