import {CSSProperties} from "react";
import {ErrorMessage} from "../../util/err/ErrorMessage";
import ProductThumbnail from "~/api/useImgData";
import useProduct from "~/api/useProducts";
import {useProductContext} from "./ContextProvider";

interface ProductPageProps {
}

export default function ProfileProductsView({}: ProductPageProps) {
  // 商品データの取得
  const {
    isWindowOpen,
    isProductOpen,
    setisProductOpen,
    setIsVisible,
    isVisible,
    productId,
    setProductId,
    toggleWindow,
    toggleProductWindow,
    isSidebarOpen,
    setIsSidebarOpen,
    isPagevalue,
    setPageValue,
  } = useProductContext();

  const {products, error} = useProduct();

  const handleProductClick = (id: string) => {
    if (id === productId) return;

    if (isProductOpen) {
      toggleProductWindow();
      setTimeout(() => {
        setProductId(id);
        toggleProductWindow();
      }, 300);
    } else {
      setProductId(id);
      toggleProductWindow();
    }
  };

  return (
    <div style={styles.container}>
      <ErrorMessage error={error}/>
      <div style={styles.gridContainer}>
        {products.length > 0 ? (
          <div style={styles.grid}>
            {products.map((product) => (
              <div
                key={product.product_id}
                style={styles.card}
                onClick={() => handleProductClick(product.product_id)}
              >
                <div style={styles.innerFrame}></div>
                <div style={styles.thumbnailWrapper}>
                  <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
                </div>
                <div style={styles.details}>
                  <h2 style={styles.title}>{product.product_title}</h2>
                  <p style={styles.description}>{product.product_description}</p>
                  <p style={styles.price}><strong>{product.product_price}円</strong></p>
                  <p style={styles.date}><strong>日付:</strong> {product.purchase_date}</p>
                  <p style={styles.date}><strong>@</strong> {product.creator_ids.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noProducts}>商品が見つかりません。</div>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    minHeight: "100vh",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    overflow: "hidden",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.2))",
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.01), inset 0 0 15px rgba(255, 255, 255, 0.01)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    position: "relative",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    padding: "10px",
  },
  innerFrame: {
    position: "absolute",
    top: "0.5px",
    left: "0.5px",
    right: "0.5px",
    bottom: "0.5px",
    borderRadius: "18px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    pointerEvents: "none",
  },
  thumbnailWrapper: {
    width: "100%",
    height: "200px",
    backgroundColor: "#000",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
  },
  details: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1.2em",
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: "10px",
  },
  description: {
    fontSize: "0.9em",
    color: "#A3A3A3",
    lineHeight: "1.5",
    marginBottom: "10px",
  },
  price: {
    fontSize: "1em",
    color: "#FFD700",
    fontWeight: "700",
  },
  date: {
    fontSize: "0.8em",
    color: "#AAAAAA",
  },
  noProducts: {
    fontSize: "1.5em",
    color: "#AAAAAA",
    marginTop: "20px",
  },
};
