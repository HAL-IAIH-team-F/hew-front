"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useClientContext } from "~/api/useClientContext";
import { apiClient } from "~/api/wrapper";
import { ErrorData } from "../../util/err/err";
import { ErrorMessage } from "../../util/err/ErrorMessage";
import { ProductRes } from "./ProductRes";
import useImgData from "~/api/useImgData";
import ProductThumbnail from "~/api/useImgData";
import { CSSProperties } from "react";

export default function product({}: {}) {
  const [Product, setProduct] = useState<ProductRes[]>([]);
  const [err, setErr] = useState<ErrorData>();
  const session = useSession();
  const client = useClientContext(session);

  useEffect(() => {
    client.exec(apiClient.gps_api_products_get, {}).then((value) => {
      if (value.error) return setErr(value.error);
      const products = Array.isArray(value.value) ? value.value : [];
      setProduct(products);
      console.log("Fetched Products:", products);
    });
  }, [client]);

  return (
    <div style={styles.container}>
      <ErrorMessage error={err} />
      {Product.length > 0 ? (
        <div style={styles.grid}>
          {Product.map((product) => (
            <div key={product.product_id} style={styles.card}>
              <div style={styles.thumbnailWrapper}>
                <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid} />
              </div>
              <div style={styles.details}>
                <h2 style={styles.title}>{product.product_title}</h2>
                <p style={styles.description}>{product.product_description}</p>
                <p style={styles.price}><strong>{product.product_price}円</strong></p>
                <p style={styles.date}><strong>日付:</strong> {product.product_date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.noProducts}>商品が見つかりません。</div>
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
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundImage: "radial-gradient(circle at center, #1E1E1E, #121212)",
    minHeight: "100vh",
    
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "30%",
    maxWidth: "1200px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "15px",
    overflow: "hidden",
    backgroundColor: "#1F1F1F",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  thumbnailWrapper: {
    width: "100%",
    height: "200px", // 高さを固定（縦長に統一）
    backgroundColor: "#000",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // 縦横比を維持して要素全体を埋める
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
