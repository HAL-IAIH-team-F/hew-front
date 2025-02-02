import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ProductThumbnail from "~/api/useImgData";
import { ProductRes } from "@/(main)/search/sample/ProductRes";

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

type NotificationProps = {
  message: string;
  product?: ProductRes;
  onClose: () => void;
  index: number;
};

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