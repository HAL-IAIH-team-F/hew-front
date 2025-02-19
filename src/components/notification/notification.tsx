import React, { CSSProperties, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import ProductThumbnail from "~/api/useProductThumbnail";
import { ProductRes } from "@/(main)/search/sample/ProductRes";
import { useProductContext } from "~/products/ContextProvider";
import { Api } from "~/api/context/Api";
import { CartRes } from "@/(main)/(timeline)/cart/CartRes";
import { useClientState } from "~/api/context/ClientContextProvider";
import { ErrorData } from "../../util/err/err";
import useProducts from "~/hooks/useProducts";
import { Trash2, MinusCircle, PlusCircle, ShoppingCart } from 'lucide-react';
import useProduct from "~/hooks/useProduct";

const notificationStyle = {
  container: {
    display: "flex",
    alignItems: "center",
    background: "#333",
    color: "#fff",
    padding: "15px 25px",
    borderRadius: "12px",
    boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.3)",
    width: "350px",
    position: "fixed",
    right: "20px",
    zIndex: 1000,
  } as React.CSSProperties,
  icon: {
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
  imageContainer: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    overflow: "hidden",
    marginRight: "10px",
  } as React.CSSProperties,
  content: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
  strong: {
    fontSize: "14px",
    display: "block",
  } as React.CSSProperties,
  paragraph: {
    fontSize: "12px",
    margin: 0,
  } as React.CSSProperties,
  close: {
    cursor: "pointer",
    fontSize: "18px",
    color: "#fff",
    padding: "0 5px",
    marginLeft: "10px",
  } as React.CSSProperties,
};


const purchaseStyle: Record<string, CSSProperties> = {
  modalOverlay: {
      position: "absolute", // 画面全体を覆う
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
  },
  modalContent: {
    position: "fixed", // 画面固定
    top: "50%", // 画面中央
    left: "50%", // 画面中央
    transform: "translate(-50%, -50%) !important", // 中央揃え
    background: "#333",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    width: "350px",
    height: "auto",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1001,
},

    modalTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    modalButtonContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButton: {
      flex: 1,
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      border: "none",
      fontSize: "14px",
      margin: "0 5px",
      zIndex: 1001,
    },
    modalButtonYes: {
      background: "#ff5722",
      color: "#fff",
    },
    modalButtonNo: {
      background: "#ddd",
      color: "#333",
    },
};

type NotificationProps = {
  message: string;
  product?: ProductRes;
  onClose: () => void;
  index: number;

};

type PurchaseYesNoProps = {
  isModalOpen: boolean;
  onClose: () => void;
  setCompleteOpen: (id: boolean) => void;
  setPurchased_Products: (cart: CartRes) => void;
};

interface ProductListProps {
  productId?: string;
}

const Notification: React.FC<NotificationProps> = ({ message, product, onClose, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: index * 60 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ ...notificationStyle.container, top: `${20 + index * 25}px` }}
    >
      <div style={notificationStyle.icon}>
        <CheckCircle size={20} color="green" />
      </div>

      {product?.product_thumbnail_uuid && (
        <div style={notificationStyle.imageContainer}>
          <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid} />
        </div>
      )}

      <div style={notificationStyle.content}>
        <div>
          <strong style={notificationStyle.strong}>{product?.product_title || "通知"}</strong>
          <p style={notificationStyle.paragraph}>{message}</p>
        </div>
      </div>

      <div style={notificationStyle.close} onClick={onClose}>
        &times;
      </div>
    </motion.div>
  );
};

export const useNotification = (): [JSX.Element | null, (msg: string, product?: ProductRes) => void] => {
  const [notifications, setNotifications] = useState<{ message: string; product?: ProductRes; id: number }[]>([]);

  const showNotification = (msg: string, product?: ProductRes) => {
    setNotifications((prev) => {
      const newNotifications = [...prev, { message: msg, product, id: Date.now() }];
      return newNotifications.slice(-5); // 最大5つの通知を保持
    });
    
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1)); // 古い通知から順に削除
    }, 3000);
  };

  return [
    <AnimatePresence>
      {notifications.map(({ message, product, id }, index) => (
        <Notification
          key={id}
          message={message}
          product={product}
          onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== id))}
          index={index}
        />
      ))}
    </AnimatePresence>,
    showNotification,
  ];
};
const PurchaseYesNo: React.FC<PurchaseYesNoProps> = ({ isModalOpen, onClose, setCompleteOpen, setPurchased_Products }) => {
  const [cart, setCart] = useState<CartRes | undefined>(undefined);
  const clientState = useClientState();
  const [err, setErr] = useState<ErrorData | string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // ローディング状態

  const handlePurchase = async () => {
    try {
      if (clientState.state !== "registered") throw new Error("not authenticated");

      setIsLoading(true); // ローディング開始

      const response = await clientState.client.authBody(
        Api.app.cart_buy_api_cart_buy_put,
        {},
        undefined,
        {}
      );

      if (response.error) {
        setErr(response.error);
        setIsLoading(false); // エラー発生時はローディング解除
        return;
      }
      
      setPurchased_Products(response.success);
      setTimeout(() => {
        setIsLoading(false); // ローディング終了
        setCompleteOpen(true);
        onClose();
      }, 1500);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "不明なエラーが発生しました");
      setIsLoading(false); // エラー発生時はローディング解除
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={purchaseStyle.modalOverlay}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "-50%", x: "-50%", opacity: 0 }}
            animate={{ y: "-50%", x: "-50%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={purchaseStyle.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              // ローディングアニメーション
              <motion.div

                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Loader2 className="w-6 h-6 animate-spin" />
                <p className="text-lg font-medium mt-2">購入処理中…</p>
              </motion.div>
            ) : (
              <>
                <CheckCircle size={40} color="green" />
                <h3 style={purchaseStyle.modalTitle}>購入しますか？</h3>
                <div style={purchaseStyle.modalButtonContainer}>
                  <button
                    style={{ ...purchaseStyle.modalButton, ...purchaseStyle.modalButtonYes }}
                    onClick={handlePurchase}
                  >
                    はい
                  </button>
                  <button
                    style={{ ...purchaseStyle.modalButton, ...purchaseStyle.modalButtonNo }}
                    onClick={onClose}
                  >
                    いいえ
                  </button>
                </div>
                {err && <p style={{ color: "red" }}>{typeof err === "string" ? err : err.message}</p>}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PurchaseComplete: React.FC<{ isCompleteOpen: boolean; onClose: () => void; Purchased_Products?: CartRes}> = ({ isCompleteOpen, onClose, Purchased_Products }) => {
  
  return (
    <AnimatePresence>
      {isCompleteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={purchaseStyle.modalOverlay}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "-50%", x: "-50%", opacity: 0 }}
            animate={{ y: "-50%", x: "-50%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={purchaseStyle.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <CheckCircle size={40} color="green"/>
            <h3 style={purchaseStyle.modalTitle}>購入ありがとうございました！</h3>
            <div style={purchaseStyle.purchaseDetails}>
              {Purchased_Products ? (
                <ul>
                  {Purchased_Products?.product_ids.map((value) => (
                    <div key={value}>
                      {<ProductList productId={value}/>}
                    </div>
                  ))}
                </ul>
              ) : (
                <p>購入情報を取得できませんでした。</p>
              )}
            </div>
            <button
              style={{ ...purchaseStyle.modalButton, ...purchaseStyle.modalButtonClose }}
              onClick={onClose}
            >
              閉じる
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export const usePurchaseYesNo = (): [JSX.Element | null, () => void, JSX.Element | null,] => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState<boolean>(false);
  const [Purchased_Products, setPurchased_Products] = useState<CartRes | undefined>(undefined);
  const showPurchaseYesNo = () => {
    setIsCompleteOpen(false); // ここでリセット
    setIsModalOpen(true); // 確実に開く
  };
  

  return [
    <PurchaseYesNo isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setCompleteOpen={setIsCompleteOpen} setPurchased_Products={setPurchased_Products}/>,
    showPurchaseYesNo,
    <PurchaseComplete isCompleteOpen={isCompleteOpen} onClose={() => setIsCompleteOpen(false)} Purchased_Products={Purchased_Products} />, 
  ];
};

const ProductList: React.FC<ProductListProps> = ({ productId }) => {
  const productState = useProduct(productId);
    if (productState.state !== "success") {
      return (
        <div className="p-4 text-gray-400 text-center">
          商品が見つかりませんでした
        </div>
      );
    }
  return (
    <>
      <div key={productState.product.product_id} className="p-4 flex items-center gap-4">
        <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
          <ProductThumbnail product_thumbnail_uuid={productState.product.product_thumbnail_uuid} />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-white-900 mb-1">{productState.product.product_title}</h3>
        </div>
      </div>
    </>
  );
};

export default ProductList;
