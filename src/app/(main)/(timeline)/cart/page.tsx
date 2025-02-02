"use client";
import {CSSProperties, useEffect, useState} from "react";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../util/err/err";
import {CartRes} from "@/(main)/(timeline)/cart/CartRes";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import {SignInOutButton} from "~/auth/nextauth/SignInOutButton";
import ProductThumbnail from "~/api/useImgData";
import useProducts from "~/hooks/useProducts";
import {useClientState} from "~/api/context/ClientContextProvider";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNotification } from "~/notification/notification";
import { useProductContext } from "~/products/ContextProvider";

const styles: Record<string, CSSProperties> = {
  productList: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f6f6f6",
  },
  title: {
    textAlign: "left" as CSSProperties["textAlign"],
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    borderBottom: "2px solid #e7e7e7",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  productGrid: {
    display: "flex",
    flexDirection: "column" as CSSProperties["flexDirection"],
    gap: "15px",
    listStyle: "none",
    padding: 0,
  },
  productCard: {
    display: "flex",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    padding: "10px",
    alignItems: "center",
  },
  productThumbnail: {
    width: "80px",
    height: "80px",
    objectFit: "cover" as CSSProperties["objectFit"],
    marginRight: "10px",
    backgroundColor: "#f8f8f8",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  productDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as CSSProperties["flexDirection"],
    gap: "3px",
  },
  productTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#B12704",
  },
  error: {
    color: "red",
    textAlign: "center" as CSSProperties["textAlign"],
    margin: "10px 0",
  },
  loading: {
    textAlign: "center" as CSSProperties["textAlign"],
    fontSize: "18px",
    color: "#555",
  },
  thumbnailWrapper: {
    width: "13%",
    height: "auto", // 高さを制御しない場合
    backgroundColor: "#000",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center", // 画像を中央に配置
    alignItems: "center",
    borderRadius: "6px",
  },
  thumbnailImage: {
    width: "100%", // 親要素の幅に合わせる
    height: "100%", // 親要素の高さに合わせる
    objectFit: "cover", // 画像が要素を覆うようにリサイズ
    objectPosition: "center", // 画像を中央に配置
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  } as CSSProperties,
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#333",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    width: "350px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as CSSProperties,
  modalTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
  } as CSSProperties,
  modalButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  } as CSSProperties,
  modalButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    fontSize: "14px",
    margin: "0 5px",
    zIndex: 1001,
  } as CSSProperties,
  modalButtonYes: {
    background: "#ff5722",
    color: "#fff",
  } as CSSProperties,
  modalButtonNo: {
    background: "#ddd",
    color: "#333",
  } as CSSProperties,
};

export default function CartPage({}: {}) {
  const clientState = useClientState();
  const [err, setErr] = useState<ErrorData | string>();
  const [cart, setCart] = useState<CartRes>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showNotification } = useProductContext()

  useEffect(() => {
    if (clientState.state != "registered") return;
    clientState.client.auth(Api.app.gc_api_cart_get, {}, {}).then((value) => {
      if (value.error) return setErr(value.error);
      // noinspection SuspiciousTypeOfGuard
      if (typeof value.success == "string") return setErr("no cart");
      setCart(value.success);
    });
  }, [clientState.state]);


  return (
    
    <div>
      {cart?.product_ids.map((value) => (
        <p key={value}>
          {<ProductList productId={value}/>}
        </p>
      ))}
      
      <ErrorMessage error={err}/>
      <SignInOutButton/>
      {/* 購入確認モーダル */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* 背景の暗転 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={styles.modalOverlay}
              onClick={() => setIsModalOpen(false)}
            />

            {/* モーダル本体 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()} // クリックイベントの競合を防ぐ
            >
              <CheckCircle size={40} color="green" />
              <h3 style={styles.modalTitle}>購入しますか？</h3>
              <div style={styles.modalButtonContainer}>
                <button
                  style={{ ...styles.modalButton, ...styles.modalButtonYes }}
                  onClick={() => {
                    if (clientState.state !== "registered") throw new Error("not authenticated");
                    clientState.client
                      .authBody(Api.app.cart_buy_api_cart_buy_put, {}, undefined, {})
                      .then((value) => {
                        if (value.error) return setErr(value.error);
                        showNotification("購入完了")
                        setCart(undefined)
                        
                        setTimeout(() => {
                          setIsModalOpen(false);
                        }, 300);
                      });
                  }}
                >
                  はい
                </button>
                <button
                  style={{ ...styles.modalButton, ...styles.modalButtonNo }}
                  onClick={() => setIsModalOpen(false)}
                >
                  いいえ
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <button
        className="border-2 hover:bg-gray-300"
        disabled={!cart}
        onClick={() => setIsModalOpen(true)}
      >
        購入
      </button>
    </div>
  );
}

interface ProductListProps {
  productId?: string;
}

const ProductList: React.FC<ProductListProps> = ({productId}) => {
  const {products, error} = useProducts({productId});

  if (error) {
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  if (!products.length) {
    return <div style={styles.loading}>Loading or no products available...</div>;
  }

  return (
    <div style={styles.productList}>
      <ul style={styles.productGrid}>
        {products.map((product) => (
          <li key={product.product_id} style={styles.productCard}>
            <div style={styles.thumbnailWrapper}>
              <div style={styles.thumbnailImage}>
                <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
              </div>
            </div>
            <div style={styles.productDetails}>
              <h2 style={styles.productTitle}>{product.product_title}</h2>
              <p style={styles.productPrice}>{product.product_price}円</p>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};
