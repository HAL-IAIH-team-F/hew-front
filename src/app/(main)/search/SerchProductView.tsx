import React, { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import ProductThumbnail from "~/api/useProductThumbnail";
import useRoutes from "~/route/useRoutes";
import useProductId from "~/products/useProductId";
import useProducts from "~/hooks/useProducts";
import { ErrorMessage } from "../../../util/err/ErrorMessage";
import Image from "../../../util/Image";
import useCreatorData from "~/hooks/useCreatorData";
import { useWindowSize } from "@/_hook/useWindowSize";
import { useProductContext } from "~/products/ContextProvider";
interface SerchProductViewProps {
    Search: string;
}
export default function SerchProductView({ Search }: SerchProductViewProps) {
  const [searchTag, setSearchTag] = useState(Search);
  const { products, error } = useProducts({ name: searchTag });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const openedProductId = useProductId();
  const routes = useRoutes();
  const windowSize = useWindowSize();
  const { isSidebarOpen, isProductOpen }= useProductContext()
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

    return { columns, cardWidth, cardHeight };
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
  }, [windowSize,isSidebarOpen,isProductOpen]);

  // レイアウトの再計算
  useEffect(() => {
    setLayout(calculateLayout());
  }, [containerWidth, calculateLayout]);

  useEffect(() => {
      setSearchTag(Search);
  }, [Search]);

  // デバッグ用のログ出力
  useEffect(() => {
      console.log("検索ワード:", searchTag);
      console.log("検索結果:", products);
  }, [searchTag, products]);

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
                routes.search().setProductId(product.product_id).transition(event)
            }
          >
            {/* サムネイル背景 */}
            <div className="absolute inset-0 bg-black ">
              <div className={`absolute inset-0 transition-transform duration-500   ${hoveredCard === product.product_id  ? "scale-105" : "scale-100"}`}>
                <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${hoveredCard === product.product_id  ?"opacity-0" : "opacity-100"}`}
              />
            </div>

            {/* 商品情報オーバーレイ */}

              
            <div className="absolute bottom-0 w-full flex justify-end p-4">
              <p 
                className="font-bold text-white p-2 rounded"
                style={{ fontSize: `${layout.cardWidth * 0.04}px` }}
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
}

interface CreatorDataProps {
  creator_id: string;
}

export function CreatorData({ creator_id }: CreatorDataProps) {
  const [_, user_data, __] = useCreatorData({ creator_id });

  return (
    <div>

      {user_data?.icon ? (
        <>
        <div style={styles.userName}>@{user_data?.screen_id}</div>
          <Image
            alt="User Icon"
            src={(user_data.icon as any).strUrl()} // 型の不一致を回避
            width={33}
            height={33}
            style={styles.userIcon}
          />
        </>
      ) : (
        <div>No Icon</div>
      )}
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        scrollbarWidth: "none", // Firefox のスクロールバー非表示
        msOverflowStyle: "none", // IE, Edge のスクロールバー非表示
        maxHeight: "calc(100vh - 200px)", // 親要素の高さを制限
      },
    gridContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },
    grid: {
        display: "grid",
        gap: "20px",
    },
    card: {
        position: "relative",
        borderRadius: "25px",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 10px 30px rgba(255, 255, 255, 0.01)",
        border: "2px solid rgba(255, 255, 255, 0.5)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, outline 0.3s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        width: "370px",
        height: "200px",
    },
    cardHover: {
        outline: "5px solid rgba(255, 255, 255, 0.5)",
        transform: "scale(1.01)",
        boxShadow: "0 15px 40px rgba(255, 255, 255, 0.1)",
    },
    descriptionOverlay: {
        position: "absolute",
        top: "60%",
        left: "0",
        width: "100%",
        height: "100%",
        padding: "10px",
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.6))",
        color: "#fff",
        zIndex: 2,
        textAlign: "center",
        backdropFilter: "blur(0.2px)",
    },
    thumbnailWrapper: {
        width: "100%",
        height: "200px",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    title: {
        textAlign: "left",
        position: "absolute",
        left: "5%",
        fontSize: "1.8rem",
        color: "#ffffff",
        fontWeight: "bold",
        marginBottom: "5px",
        textShadow: "3px 3px 6px rgba(100, 99, 99, 0.7)",
    },
    creator_data: {
        fontSize: "0.9rem",
        color: "#cccccc",
        margin: "0",
        lineHeight: "1.4",
    },
    rightdescription: {
        textAlign: "right",
    },
    
    price: {
        fontSize: "1.2rem",
        color: "#ffffff",
        fontWeight: "bold",
        marginBottom: "1px",
        marginRight: "0",
    },
    noProducts: {
        fontSize: "1.5rem",
        color: "#aaaaaa",
        marginTop: "20px",
    },
    userIcon: {
        borderRadius: "50%",
        width: "23px",
        height: "23px",
        objectFit: "cover",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        border: "2px solid rgba(0, 0, 0, 0.8)",
        top: "60px",
        left: "30px",
    },
    userName: {
        position: 'absolute',
        top: '47px',
        left: '47px',
        color: "white",

    }
};
