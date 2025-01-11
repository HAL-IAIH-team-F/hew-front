import React, { useEffect, useState } from 'react';
import { useProductContext } from './ContextProvider';
import { useCartContext } from "../cart/CartContext"
import { ProductWindowStyle } from '~/Sidebar/Styles';
import useProduct from '~/api/useProducts';
import ProductThumbnail from '~/api/useImgData';
import { ProductRes } from './ProductRes';

const RightProductWindows: React.FC = () => {
  const { productId, isProductOpen } = useProductContext();
  const { addToCart } = useCartContext();
  const [currentProducts, setCurrentProducts] = useState<ProductRes[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { products, error } = useProduct({ productId: productId });

  useEffect(() => {
    if (productId) {
      setCurrentProducts([]);
      setErrorMessage('');
    }
  }, [productId]);

  useEffect(() => {
    if (error) {
      setErrorMessage('エラーが発生しました。商品を取得できません。');
      setCurrentProducts([]);
    } else if (products) {
      setCurrentProducts(products);
      setErrorMessage('');
    }
  }, [products, error]);

  const handleAddToCart = (product: ProductRes) => {
    addToCart({
      product_id: product.product_id,
      product_title: product.product_title,
      product_price: product.product_price,
      product_thumbnail_uuid: product.product_thumbnail_uuid,
    });
    alert(`${product.product_title} をカートに追加しました。`);
  };

  return (
    <div style={styles.container(isProductOpen)}>
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      {currentProducts.length > 0 ? (
        <div style={styles.product}>
          {currentProducts.map((product) => (
            <div key={product.product_id} style={styles.productCard}>
              <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid} />
              <div style={styles.productDetails}>
                <h3 style={styles.productTitle}>{product.product_title}</h3>
                <p style={styles.productDescription}>{product.product_description}</p>
                <p style={styles.productPrice}>¥{product.product_price.toLocaleString()}</p>
                <p style={styles.purchaseDate}>購入日: {product.purchase_date}</p>
                <button
                  style={styles.addToCartButton}
                  onClick={() => handleAddToCart(product)}
                >
                  カートに追加
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noProductsMessage}>現在、商品はありません。</p>
      )}
    </div>
  );
};

const styles = {
  container: (isProductOpen: boolean): React.CSSProperties => ({
    ...ProductWindowStyle(isProductOpen),
  }),
  errorMessage: {
    color: 'red',
    textAlign: 'center' as React.CSSProperties['textAlign'],
    marginBottom: '1rem',
  },
  product: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
    padding: '1rem',
    width: '100%',
  },
  productCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  productDetails: {
    marginTop: '0.5rem',
  },
  productTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  productDescription: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  productPrice: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: '0.5rem',
  },
  purchaseDate: {
    fontSize: '0.8rem',
    color: '#888',
  },
  addToCartButton: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#ff5722',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noProductsMessage: {
    textAlign: 'center' as React.CSSProperties['textAlign'],
    color: '#555',
    fontSize: '1rem',
  },
};

export default RightProductWindows;
