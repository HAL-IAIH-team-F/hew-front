"use client"
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ProductThumbnail from '~/api/useProductThumbnail';
import useProducts from '~/hooks/useProducts';
import useRoutes from '~/route/useRoutes';
import Image from '../../../../../../../util/Image';
import {useUserData} from '~/api/context/useUserData';
import {useWindowSize} from '@/_hook/useWindowSize';
import {useProductContext} from '~/products/ContextProvider';

const ProductsGrid = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const {products} = useProducts({});
  const routes = useRoutes();
  const windowSize = useWindowSize();
  const {isSidebarOpen, isProductOpen} = useProductContext()
  // レスポンシブ用の基準値
  const baseCardWidth = 370;
  const baseCardHeight = 200;
  const minCardWidth = 300;

  // カードのレイアウト計算関数
  const calculateLayout = useCallback(() => {
    const columns = Math.max(1, Math.floor(containerWidth / baseCardWidth));
    const availableWidth = containerWidth - (20 * (columns - 1));
    const cardWidth = Math.max(minCardWidth, Math.min(baseCardWidth, availableWidth / columns));
    const cardHeight = (cardWidth * baseCardHeight) / baseCardWidth;

    return {columns, cardWidth, cardHeight};
  }, [containerWidth, baseCardWidth, baseCardHeight, minCardWidth]);

  // 初期レイアウトを設定
  const [layout, setLayout] = useState(calculateLayout);

  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.offsetWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);

  }, [windowSize, isSidebarOpen, isProductOpen]);

  // レイアウトの再計算
  useEffect(() => {
    setLayout(calculateLayout());
  }, [containerWidth, calculateLayout]);

  return (
      <div className="p-6 overflow-y-auto flex-grow min-h-0 " ref={containerRef}>
        <div
            className="grid gap-5 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
              maxWidth: `${layout.cardWidth * layout.columns + (layout.columns - 1) * 20}px`
            }}
        >
          {products.map((product) => (
              <div
                  key={product.product_id}
                  className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 "
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    width: '100%',
                    height: `${layout.cardHeight}px`,
                    outline: hoveredCard === product.product_id ? '3px solid rgba(255, 255, 255, 0.5)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredCard(product.product_id)} // ホバー開始
                  onMouseLeave={() => setHoveredCard(null)} // ホバー終了
                  onClick={
                    event =>
                        routes.account.account().setProductId(product.product_id).transition(event)
                  }
              >
                {/* サムネイル背景 */}
                <div className="absolute inset-0 bg-black ">
                  <div
                      className={`absolute inset-0 transition-transform duration-500   ${hoveredCard === product.product_id ? "scale-105" : "scale-100"}`}>
                    <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
                  </div>
                  <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${hoveredCard === product.product_id ? "opacity-0" : "opacity-100"}`}
                  />
                </div>

                {/* 商品情報オーバーレイ */}


                <div className="absolute bottom-0 w-full flex justify-end p-4">
                  <p
                      className="font-bold text-white p-2 rounded"
                      style={{fontSize: `${layout.cardWidth * 0.04}px`}}
                  >
                <span
                    className="text-white px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)" // 半透明の黒背景
                    }}
                >
                  ¥{product.product_price.toLocaleString()}
                </span>
                  </p>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

function AccountCard  (
    {
        userId
    }:{
      userId: string
    }
)  {
  const [activeTab, setActiveTab] = useState("商品");
  const tabs = ["商品", "コラボ",];
  const tabRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>(
      Object.fromEntries(tabs.map((tab) => [tab, React.createRef<HTMLButtonElement>()]))
  );
  const {user} = useUserData(userId);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.style.opacity = "0";
    contentRef.current.style.transform = "translateY(10px)";

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (!contentRef.current) return;
        contentRef.current.style.opacity = "1";
        contentRef.current.style.transform = "translateY(0)";
      }, 50);
    });
  }, [activeTab]);

  return (
      <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
        {/* ヘッダー */}
        <div
            className="w-full h-48 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
          {user && user.icon ? (
              <div className="flex flex-col items-center">
                <div className="rounded-full">
                  <Image
                      alt="User Icon"
                      src={user.icon.strUrl()}
                      className="w-24 h-24 rounded-full object-contain border-4 border-gray-700"
                  />
                </div>
                <div className="mt-3 text-lg font-semibold">{user.name}</div>
                <div className="text-sm text-gray-400">@{user.id}</div>
              </div>
          ) : (
              <div className="flex flex-col items-center">
                <Image
                    alt="Default Icon"
                    src="/icon.png"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
                />
                <div className="mt-3 text-lg font-semibold">ログインしていません</div>
                <div className="text-sm text-gray-400">error</div>
              </div>
          )}

        </div>

        {/* タブ */}
        <div className="border-b border-gray-700">
          <div className="flex justify-center space-x-5 px-4 pb-3">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    ref={tabRefs.current[tab]}
                    onClick={() => setActiveTab(tab)}
                    className={`
                              px-6 py-3 text-sm rounded-lg transition-all duration-200
                              ${activeTab === tab
                        ? "bg-gray-700 text-gray-100 font-medium"
                        : "text-gray-400 hover:text-gray-100 hover:bg-gray-700/50"}
                          `}
                >
                  {tab}
                </button>
            ))}
          </div>
        </div>
        {/* コンテンツ */}
        <div
            ref={contentRef}
            className="flex-1 flex-grow overflow-y-auto transition-all duration-300 ease-out"
            style={{
              height: "calc(100vh - 200px)",
              maxHeight: "calc(100vh - 360px)",
              boxSizing: "border-box",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
        >
          {activeTab === "商品" && <ProductsGrid/>}
          {activeTab === "コラボ" && <div className="p-6">コラボ content...</div>}
          {activeTab === "Media" && <div className="p-6">Media content...</div>}
          {activeTab === "Likes" && <div className="p-6">Likes content...</div>}
        </div>
      </div>
  );
}

export default AccountCard;