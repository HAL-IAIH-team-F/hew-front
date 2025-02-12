"use client"
import React, {CSSProperties, useEffect} from 'react';
import {ProductWindowStyle} from '@/(main)/(timeline)/_window/_sidebar/Styles';
import useProduct from "~/hooks/useProduct";
import useProductId from "~/products/useProductId";
import RightWindowProduct from "@/(main)/(timeline)/_window/_right/RightWindowProduct";
import useRoutes from '~/route/useRoutes';
import { Key, X } from 'lucide-react';

const RightWindow: React.FC = () => {
  const productId = useProductId()
  const productState = useProduct(productId);
  const routes = useRoutes()
  
  useEffect(() => {
    if (productState.state != "error") return;
    console.error(productState.error)
  }, [productState]);
  
  const closeHandler = () => {
    routes.setParam("productId",undefined)
  }

  return (
    <div style={styles.container(productId != undefined)}>
      
      
      {productState.state == "error" && <p style={styles.errorMessage}>エラーが発生しました。商品を取得できません。</p>}
      {productState.state == "success" ? (
        <div style={styles.product}>
          <button
              onClick={closeHandler}
              className="group absolute top-4 right-4 p-2 rounded-full
                        bg-zinc-900/40 backdrop-blur-sm
                        border border-zinc-700/50
                        transition-all duration-300 ease-in-out
                        hover:scale-110 hover:bg-zinc-800/60
                        hover:border-zinc-600 z-[9999]"
            >
            <X className="w-5 h-5 text-zinc-300 transition-colors duration-300 
                          group-hover:text-white" />
          </button>
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
    padding: '9px',
    width: '100%',
    height: '100%',
    
  },
  noProductsMessage: {
    textAlign: 'center' as React.CSSProperties['textAlign'], // 型の明示
    color: '#555',
    fontSize: '1rem',
  },
};

export default RightWindow;
