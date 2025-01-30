import React, {CSSProperties, useEffect} from 'react';
import {ProductWindowStyle} from '@/(main)/(timeline)/_sidebar/Styles';
import RightWindowProduct from "@/(main)/(timeline)/_window/RightWindowProduct";
import useProduct from "~/hooks/useProduct";
import useProductId from "~/products/useProductId";

const RightWindow: React.FC = () => {
  const productId = useProductId()
  const productState = useProduct(productId);

  useEffect(() => {
    if (productState.state != "error") return;
    console.error(productState.error)
  }, [productState]);

  return (
    <div style={styles.container(productId != undefined)}>
      {productState.state == "error" && <p style={styles.errorMessage}>エラーが発生しました。商品を取得できません。</p>}
      {productState.state == "success" ? (
        <div style={styles.product}>
          <RightWindowProduct product={productState.product} key={productState.product.product_id}/>
        </div>
      ) : (
        <p style={styles.noProductsMessage}>現在、商品はありません。</p>
      )}
    </div>
  );
};

const styles = {
  container: (isProductOpen: boolean): CSSProperties => ({
    ...ProductWindowStyle(isProductOpen),
  }),
  banner: {
    width: '100%',
    height: '15%',
    backgroundColor: '#ff5722',
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as React.CSSProperties['textAlign'], // 型の明示
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center' as React.CSSProperties['textAlign'], // 型の明示
    marginBottom: '1rem',
  },
  product: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
    padding: '1rem',
    width: '100%',
  },
  noProductsMessage: {
    textAlign: 'center' as React.CSSProperties['textAlign'], // 型の明示
    color: '#555',
    fontSize: '1rem',
  },
};

export default RightWindow;
