import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {FaTimes} from "react-icons/fa";
import {gsap} from "gsap";
import ProductListingForm from "@/(main)/product/listing/ProductListingForm";
import {IoWaterOutline} from "react-icons/io5";

// ボタンのスタイル
const useButtonStyles = (isHovered: boolean) => {
  return useMemo(() => ({
    button: {
      position: "absolute" as const,
      top: 15,
      left: 100,
      zIndex: 1,
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: 8,
      borderRadius: "50%",
      transition: "transform 0.3s",
    },
    icon: {
      fontSize: 45,
      color: "#ffffff",
    },
    buttonHover: {
      transform: "scale(1.1)",
    },
  }), [isHovered]);
};

// オーバーレイと検索ページのスタイル
const useOverlayStyles = () => {
  return useMemo(() => ({
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column" as const, // 縦に並べる
      alignItems: "center",
      justifyContent: "flex-start", // 上部から配置
      overflowY: "auto" as const,
      overflowX: "hidden" as const,
      color: "#000",
    },
    ProductListing: {
      width: "100%",
      maxWidth: "100%", // 必要に応じて横幅を制限
      maxHeight: "100%", // 親要素内で高さを制限
      margin: "0 auto",
      overflow: "auto", // 子要素内でスクロールを可能にする
      backgroundColor: "#000000",
      position: "relative" as const,
      visibility: "hidden" as const
    },
  }), []);
};

// 検索ページのアニメーション処理
const useProductListingAnimation = (
  isProductListingOpen: boolean,
  ProductListingRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (ProductListingRef.current) {
      gsap.to(ProductListingRef.current, {
        y: isProductListingOpen ? "0%" : "-100%",
        opacity: isProductListingOpen ? 1 : 0,
        duration: 0.8,
        ease: isProductListingOpen ? "power3.out" : "power3.in",
        onComplete: () => {
          if (!isProductListingOpen) {
            ProductListingRef.current!.style.visibility = "hidden";
          }
        },
      });

      if (isProductListingOpen) {
        ProductListingRef.current.style.visibility = "visible";
      }
    }
  }, [isProductListingOpen, ProductListingRef]);
};

const ProductListingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isProductListingOpen, setIsProductListingOpen] = useState(false);
  const [icon, setIcon] = useState(<IoWaterOutline />);
  const ProductListingRef = useRef<HTMLDivElement | null>(null);

  const styles = useButtonStyles(isHovered);
  const overlayStyles = useOverlayStyles();

  const toggleProductListing = useCallback(() => {
    setIsProductListingOpen((current) => {
      setIcon(current ? <IoWaterOutline /> : <FaTimes />);
      return !current;
    });
  }, []);

  useProductListingAnimation(isProductListingOpen, ProductListingRef);

  return (
    <>
      <button
        style={{
          ...styles.button,
          ...(isHovered ? styles.buttonHover : {}),
        }}
        onClick={toggleProductListing}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.icon}>{icon}</div>
      </button>
      <div style={overlayStyles.overlay}>
        <div ref={ProductListingRef} style={overlayStyles.ProductListing}>
          <ProductListingForm />
        </div>
      </div>
    </>
  );
};

export default ProductListingButton;
