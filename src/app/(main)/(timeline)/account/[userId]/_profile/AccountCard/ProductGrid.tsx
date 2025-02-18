"use client"
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ProductThumbnail from '~/api/useProductThumbnail';
import useProducts from '~/hooks/useProducts';
import useRoutes from '~/route/useRoutes';
import {UserInfo} from '~/api/context/useUserData';
import {useWindowSize} from '@/_hook/useWindowSize';
import {useProductContext} from '~/products/ContextProvider';

export const ProductsGrid: React.FC<{ userdata: UserInfo }> = ({userdata}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const routes = useRoutes();
  const windowSize = useWindowSize();
  const {isSidebarOpen, isProductOpen} = useProductContext()
  // レスポンシブ用の基準値
  const baseCardWidth = 370;
  const baseCardHeight = 200;
  const minCardWidth = 300;

  const {products} = useProducts({post_by: userdata.creator_data?.creator_id ? userdata.creator_data?.creator_id : ""});
  // console.debug("productGrid",products)
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
                        routes.accountRoutes.account().setProductId(product.product_id).transition(event)
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
