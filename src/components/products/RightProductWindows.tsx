import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useProductContext} from './ContextProvider';
import {ProductWindowStyle} from '~/Sidebar/Styles';
import useProduct from '~/api/useProducts';

import ProductThumbnail from '~/api/useImgData';
import {ErrorData} from '../../util/err/err';
import {Api} from '~/api/context/Api';
import {ProductRes} from "@/(main)/search/sample/ProductRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ClientState} from "~/api/context/ClientState";

const RightProductWindows: React.FC = () => {
  const {productId, isProductOpen} = useProductContext();
  const [currentProducts, setCurrentProducts] = useState<ProductRes[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {products, error} = useProduct({productId: productId});

  const clientState = useClientState()
  const [err, setErr] = useState<ErrorData>()

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

  return (
    <div style={styles.container(isProductOpen)}>
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      {currentProducts.length > 0 ? (
        <div style={styles.product}>
          {currentProducts.map((product) => (
            <div key={product.product_id} style={styles.productCard}>
              <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
              <div style={styles.productDetails}>
                <h3 style={styles.productTitle}>{product.product_title}</h3>
                <p style={styles.productDescription}>{product.product_description}</p>
                <p style={styles.productPrice}>¥{product.product_price.toLocaleString()}</p>
                <p style={styles.purchaseDate}>購入日: {product.purchase_date}</p>
              </div>
              <button
                className={"border-2  enabled:hover:bg-gray-300 enabled:bg-gray-200"}
                disabled={clientState.state != "registered"}
                onClick={() => {
                  addCart(clientState, setErr, productId).catch(reason => {
                    console.error(reason)
                  })
                }}
              >カートに入れる
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noProductsMessage}>現在、商品はありません。</p>
      )}
    </div>
  );
};

async function addCart(
  clientState: ClientState, setErr: Dispatch<SetStateAction<ErrorData | undefined>>,
  product_id: string
) {
  if (clientState.state != "registered") return
  setErr(undefined)
  const cartResult = await clientState.client.auth(Api.app.gc_api_cart_get, {}, {})
  if (cartResult.error) return setErr(cartResult.error)
  // noinspection SuspiciousTypeOfGuard
  if (typeof cartResult.success == "string") {
    const postResult = await clientState.client.authBody(Api.app.pc_api_cart_post, {}, {
      products: [product_id]
    }, {})
    if (postResult.error) return setErr(postResult.error)
  } else {
    const patchResult = await clientState.client.authBody(Api.app.pac_api_cart_patch, {}, {
      new_products: [product_id]
    }, {})
    if (patchResult.error) return setErr(patchResult.error)
  }
}

const styles = {
  container: (isProductOpen: boolean): React.CSSProperties => ({
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
  noProductsMessage: {
    textAlign: 'center' as React.CSSProperties['textAlign'], // 型の明示
    color: '#555',
    fontSize: '1rem',
  },
};

export default RightProductWindows;
