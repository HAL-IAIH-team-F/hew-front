"use client"
import React, {CSSProperties, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ProductWindowStyle} from '@/(main)/(timeline)/_window/_sidebar/Styles';
import useProduct from "~/hooks/useProduct";
import useProductId from "~/products/useProductId";
import RightWindowProduct from "@/(main)/(timeline)/_window/_right/RightWindowProduct";
import useRoutes from '~/route/useRoutes';
import {Lock, ShoppingCart, X} from 'lucide-react';
import {FullScreenLoader} from '~/loadingUI/FullSceenLoader';
import {Button, CardFooter} from './UI';
import {useClientState} from '~/api/context/ClientContextProvider';
import {useProductContext} from '~/products/ContextProvider';
import {ClientState} from '~/api/context/ClientState';
import {ErrorData} from '../../../../../util/err/err';
import {Api} from '~/api/context/Api';
import useTimelineWindowSize from "@/(main)/(timeline)/_timeline/useTimelineWindowSize";
import {Theme} from "@/Theme";

const RightWindow: React.FC = () => {
  const productId = useProductId()
  const productState = useProduct(productId);
  const routes = useRoutes()
  const clientState = useClientState();
  const {showNotification} = useProductContext();
  const [_, setErr] = useState<ErrorData>();
  useEffect(() => {
    if (productState.state != "error") return;
    console.error(productState.error)
  }, [productState]);

  const closeHandler = () => {
    routes.setParam("productId", undefined)
  }
  const timelineWindowSize = useTimelineWindowSize()

  return (
      <div style={{
        backgroundColor: Theme.bg,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: timelineWindowSize.right.width,
        height: timelineWindowSize.right.height,
        display: "flex",
        position: 'fixed',
        left: timelineWindowSize.right.left,
        top: timelineWindowSize.right.top,
        transformOrigin: 'right center',
        transform: productId != undefined
            ? 'translateX(0%) scale(1)'
            : 'translateX(100%) scale(0.15)',
        borderRadius: '28px',
        opacity: productId != undefined ? 1 : 0,
        transition: `
    opacity 0.3s ease-in-out,
    width 0.3s ease,
    height 0.3s ease,
    transform 0.3s`,
        zIndex: 9,
      }}>


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
                          group-hover:text-white"/>
              </button>
              <RightWindowProduct product={productState.product} key={productState.product.product_id}/>
              <CardFooter className="absolute bottom-0 w-full flex justify-end p-4 pr-9 ">
                <Button
                    className="group relative"
                    variant={clientState.state === "registered" ? "default" : "secondary"}
                    disabled={clientState.state !== "registered"}
                    onClick={() => {
                      if (clientState.state !== "registered") {
                        showNotification("ログインしてください", productState.product);
                        return;
                      }

                      addCart(clientState, setErr, productState.product.product_id)
                          .then(() => {
                            showNotification("カートに追加しました！", productState.product);
                          })
                          .catch((reason) => {
                            console.error(reason);
                            showNotification("カート追加に失敗しました", productState.product);
                          });
                    }}
                >
            <span className="flex items-center justify-center gap-2">
              {clientState.state === "registered" ? (
                  <>
                    <ShoppingCart className="h-4 w-4"/> カートに入れる
                  </>
              ) : (
                  <>
                    <Lock className="h-4 w-4"/> ログインしてください
                  </>
              )}
            </span>
                </Button>
              </CardFooter>
            </div>
        ) : (
            <div className="rounded">
              <FullScreenLoader/>
            </div>
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

async function addCart(
    clientState: ClientState,
    setErr: Dispatch<SetStateAction<ErrorData | undefined>>,
    product_id: string
) {
  if (clientState.state != "registered") return;
  setErr(undefined);
  const cartResult = await clientState.client.auth(Api.app.gc_api_cart_get, {}, {});
  if (cartResult.error) return setErr(cartResult.error);

// noinspection SuspiciousTypeOfGuard
  if (typeof cartResult.success == "string") {
    const postResult = await clientState.client.authBody(
        Api.app.pc_api_cart_post,
        {},
        {products: [product_id]},
        {}
    );
    if (postResult.error) return setErr(postResult.error);
  } else {
    const patchResult = await clientState.client.authBody(
        Api.app.pac_api_cart_patch,
        {},
        {new_products: [product_id]},
        {}
    );
    if (patchResult.error) return setErr(patchResult.error);
  }
}

export default RightWindow;
