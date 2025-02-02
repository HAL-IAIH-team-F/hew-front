// rightwindow.tsx
import React, { CSSProperties, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductWindowStyle } from '@/(main)/(timeline)/_sidebar/Styles';
import RightWindowProduct from "@/(main)/(timeline)/_window/RightWindowProduct";
import useProduct from "~/hooks/useProduct";
import useProductId from "~/products/useProductId";

const RightWindow: React.FC = () => {
  const router = useRouter();
  const productId = useProductId();
  const productState = useProduct(productId);

  useEffect(() => {
    if (productState.state !== "error") return;
    console.error(productState.error);
  }, [productState]);

  // 「×」ボタンで /account に戻るだけ
  const handleClose = () => {
    router.push("/account");
  };

  return (
    <div
      style={{
        ...ProductWindowStyle(productId !== undefined), // 元の位置やサイズは保持
        // 背景の色や枠線、シャドウを消す
        background: "transparent",
        boxShadow: "none",
        border: "none",
      }}
    >
      {productState.state === "success" && (
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      )}

      {productState.state === "error" && (
        <p style={styles.errorMessage}>
          エラーが発生しました。商品を取得できません。
        </p>
      )}
      {productState.state === "success" ? (
        <div style={styles.product}>
          <RightWindowProduct product={productState.product} key={productState.product.product_id}/>
        </div>
      ) : (
        <p style={styles.noProductsMessage}>
          現在、商品はありません。
        </p>
      )}
    </div>
  );
};

export default RightWindow;

const styles: Record<string, CSSProperties> = {
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  product: {
    // ここはカードだけのスタイルを設定
    // 必要なければ空でもOK
  },
  noProductsMessage: {
    textAlign: 'center',
    color: '#555',
    fontSize: '1rem',
  },
};
