import React, {CSSProperties, useEffect, useState} from "react";
import {ErrorMessage} from "../../util/err/ErrorMessage";
import ProductThumbnail from "~/api/useImgData";
import useCreatorData from "../../util/hook/useCreatorData";
import Image from "../../util/Image";
import useRoutes from "~/route/useRoutes";
import useProductId from "~/products/useProductId";
import useProducts from "~/hooks/useProducts";

interface ProductPageProps {
}

export default function ProfileProductsView({}: ProductPageProps) {
  const {products, error} = useProducts();
  const [columns, setColumns] = useState(3); // 初期値
  const [hoveredCard, setHoveredCard] = useState<string | null>(null); // 現在ホバーされているカードIDを管理
  const openedProductId = useProductId()
  const routes = useRoutes()
  // 親要素の幅を監視して列数を調整
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth; // ウィンドウ幅を取得
      console.log("a", width)
      if (width >= 1200) {
        if (openedProductId != undefined) {
          setColumns(2);
        } else {
          setColumns(3);
        }

      } else if (width >= 768) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns(); // 初期実行
    window.addEventListener("resize", updateColumns); // リサイズイベント監視
    return () => window.removeEventListener("resize", updateColumns); // クリーンアップ
  }, [openedProductId != undefined]);

  return (
    <div style={styles.container} className={"overflow-y-scroll h-full"}>
      <ErrorMessage error={error}/>
      <div style={styles.gridContainer}>
        {products.length > 0 ? (
          <div
            style={{
              ...styles.grid,
              gridTemplateColumns: `repeat(${columns}, 1fr)`, // 列数を動的に設定
            }}

          >
            {products.map((product) => {
              const isHovered = hoveredCard === product.product_id; // カードがホバーされているか
              return (
                <div
                  key={product.product_id}
                  style={{
                    ...styles.card,
                    ...(isHovered && styles.cardHover), // ホバー時のスタイルを適用
                  }}

                  onMouseEnter={() => setHoveredCard(product.product_id)} // ホバー開始
                  onMouseLeave={() => setHoveredCard(null)} // ホバー終了
                  onClick={
                    event =>
                      routes.account().setProductId(product.product_id).transition(event)
                  }
                >

                  <div style={styles.descriptionOverlay}>
                    <h2 style={styles.title}>
                      {product.product_title}

                    </h2>
                    {product.creator_ids.map((id) => (
                      <p key={id} style={styles.creator_data}>
                        <CreatorData creator_id={id} showView={true}/>
                      </p>
                    ))}
                    <div style={styles.rightdescription}>
                      <p style={styles.price}>
                        <strong>{product.product_price} 円</strong>
                      </p>
                    </div>
                  </div>
                  <div style={styles.thumbnailWrapper}>
                    <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.noProducts}>商品が見つかりません。</div>
        )}
      </div>
    </div>
  );
}

interface CreatorDataProps {
  creator_id: string;
  showView?: boolean; // trueならViewを表示、falseならデータのみ取得
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

  // showViewがfalseの場合はViewを表示せず、データのみ取得
  if (!showView) return null;

  return <CreatorDataView iconUrl={iconUrl} screenId={screenId}/>;
}

interface CreatorDataViewProps {
  iconUrl: string | null;
  screenId?: string;
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
          <p>{screenId}</p>
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
    maxHeight: "calc(100vh - 570px)", // 親要素の高さを制限
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
    width: "100%",
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
    outline: "5px solid rgba(255, 255, 255, 0.5)", // ホバー時のアウトライン
    transform: "scale(1.01)", // ホバー時のスケール
    boxShadow: "0 15px 40px rgba(255, 255, 255, 0.1)", // ボックスシャドウの調整
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
  button: {
    padding: "5px 20px",
    fontSize: "0.5rem",
    fontWeight: "bold",
    color: "#ffffff",
    background: "linear-gradient(to bottom, #6c757d, #343a40)",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    marginBottom: "50px",
    marginTop: "0px",
    transition: "all 0.3s ease",
    outline: "none",
    textAlign: "center",
    zIndex: "100",
  },
  buttonHover: {
    background: "linear-gradient(to bottom, #007bff, #0056b3)", // ホバー時の色
    transform: "scale(1.05)", // ホバー時に少し拡大
  },
  noProducts: {
    fontSize: "1.5rem",
    color: "#aaaaaa",
    marginTop: "20px",
  },
  userIcon: {
    borderRadius: '50%',
    width: '23px',
    height: '23px',
    objectFit: 'cover',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    border: '2px solid rgba(0, 0, 0, 0.8)',
    top: '60px',
    left: '30px',
  },
};
