import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import ProductThumbnail from '~/api/useImgData';
import useProducts from '~/hooks/useProducts';
import useProductId from '~/products/useProductId';
import useRoutes from '~/route/useRoutes';
import Image from '../../../../../../util/Image';
import useCreatorData from '~/hooks/useCreatorData';
import { useUserData } from '~/api/context/useUserData';

const ProductsGrid = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { products, error } = useProducts();
  const openedProductId = useProductId()
  const routes = useRoutes()

  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.offsetWidth);
    };
  
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const baseCardWidth = 370;
  const baseCardHeight = 200;
  const minCardWidth = 300;

  const calculateLayout = () => {
    const columns = Math.max(1, Math.floor(containerWidth / baseCardWidth));
    const availableWidth = containerWidth - (20 * (columns - 1));
    const cardWidth = Math.max(minCardWidth, Math.min(baseCardWidth, availableWidth / columns));
    const cardHeight = (cardWidth * baseCardHeight) / baseCardWidth;

    return {
      columns,
      cardWidth,
      cardHeight
    };
  };

  const layout = calculateLayout();

  return (
    <div className="p-6 overflow-y-auto flex-grow min-h-0" ref={containerRef}>
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
            className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              width: '100%',
              height: `${layout.cardHeight}px`,
              transform: hoveredCard === product.product_id ? 'scale(1.01)' : 'scale(1)',
              outline: hoveredCard === product.product_id ? '5px solid rgba(255, 255, 255, 0.5)' : 'none',
            }}
            onMouseEnter={() => setHoveredCard(product.product_id)} // ホバー開始
            onMouseLeave={() => setHoveredCard(null)} // ホバー終了
            onClick={
            event =>
                routes.account().setProductId(product.product_id).transition(event)
            }
          >
            {/* サムネイル背景 */}
            <div className="absolute inset-0 bg-black">
                <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
            </div>

            {/* 商品情報オーバーレイ */}
            <div
              className="absolute top-[60%] left-0 w-full h-full p-4"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.6))',
                backdropFilter: 'blur(0.2px)',
              }}
            >
              <h2 
                className="text-left font-bold text-white absolute left-[5%]"
                style={{ 
                  textShadow: '3px 3px 6px rgba(100, 99, 99, 0.7)',
                  fontSize: `${layout.cardWidth * 0.05}px`
                }}
              >
                {product.product_title}
              </h2>
              <div className="text-right">
                <p 
                  className="font-bold text-white"
                  style={{ 
                    fontSize: `${layout.cardWidth * 0.04}px`
                  }}
                >
                  {product.product_price} 円
                </p>
                {product.creator_ids.map((id) => (
                    <div key={id} style={styles.creator_data}>
                        <CreatorData creator_id={id} showView={true}/>
                    </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccountCard = () => {
  const [activeTab, setActiveTab] = useState("商品");
  const tabs = ["商品", "コラボ", "Media", "Likes"];
  const tabRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>(
      Object.fromEntries(tabs.map((tab) => [tab, React.createRef<HTMLButtonElement>()]))
  );
  const { user } = useUserData();
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
          <div className="w-full h-48 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
              {user && user.icon ? (
                  <div className="flex flex-col items-center">
                      <Image
                          alt="User Icon"
                          src={user.icon.strUrl()}
                          className="w-24 h-24  object-cover border-4 border-gray-700"
                      />
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
              {activeTab === "商品" && <ProductsGrid />}
              {activeTab === "コラボ" && <div className="p-6">コラボ content...</div>}
              {activeTab === "Media" && <div className="p-6">Media content...</div>}
              {activeTab === "Likes" && <div className="p-6">Likes content...</div>}
          </div>
      </div>
  );
};
// CreatorData components remain the same
interface CreatorDataViewProps {
  iconUrl: string | null;
  screenId?: string;
}

interface CreatorDataProps {
    creator_id: string;
    showView?: boolean;
    onDataFetched?: (data: { iconUrl: string | null; screenId?: string}) => void;
}

export function CreatorData({creator_id, showView = true, onDataFetched }: CreatorDataProps) {
  const [_, user_data, __] = useCreatorData({creator_id});
  const iconUrl = user_data?.icon ? (user_data.icon as any).strUrl() : null;
  const screenId = user_data?.screen_id;

  useEffect(() => {
    if (onDataFetched) {
      onDataFetched({iconUrl, screenId});
    }
  }, [iconUrl, screenId, onDataFetched]);

  if (!showView) return null;

  return <CreatorDataView iconUrl={iconUrl} screenId={screenId}/>;
}

export function CreatorDataView({iconUrl, screenId}: CreatorDataViewProps) {
  return (
    <div>
      {iconUrl ? (
        <>
          <Image
            alt="User Icon"
            src={iconUrl}
            width={33}
            height={33}
            style={styles.userIcon}
          />
          <div style={{...styles.userName, color: 'rgba(255, 255, 255, 0.9)'}}>{screenId}</div>
        </>
      ) : (
        <div>No Icon</div>
      )}
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
    userIcon: {
        borderRadius: '50%',
        width: '23px',
        height: '23px',
        objectFit: 'cover',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        border: '2px solid rgba(17, 24, 39, 0.8)',
        top: '60px',
        left: '30px',
    },
    userName: {
        position: 'absolute',
        top: '47px',
        left: '47px',
        color: "rgba(255, 255, 255, 0.9)",
    },
    creator_data: {
        fontSize: "0.9rem",
        color: "rgba(255, 255, 255, 0.8)",
        margin: "0",
        lineHeight: "1.4",
    },
    icon: {
        fontSize: '27px',
        color: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
    },
    profileIcon: {
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        border: '2px solid rgba(17, 24, 39, 0.8)',
        top: "10%",
        left: "60%"
    },
    profileuserIcon: {
        borderRadius: '50%',
        width: '43px',
        height: '43px',
        objectFit: 'cover',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        top: '50%',
        left: '50%',
    },
};

export default AccountCard;