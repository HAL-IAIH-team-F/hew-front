import ProductThumbnail from "~/api/useImgData";
import React, {Dispatch, SetStateAction, useState} from "react";
import {ProductRes} from "@/(main)/search/sample/ProductRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ClientState} from "~/api/context/ClientState";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../../util/err/err";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";
import { useNotification } from "~/notification/notification";
import { useProductContext } from "~/products/ContextProvider";

export default function RightWindowProduct(
  {
    product,
  }: {
    product: ProductRes,
  },
) {
  const clientState = useClientState()
  const [err, setErr] = useState<ErrorData>()
  const { showNotification } = useProductContext()

  return (
    <div key={product.product_id} style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '1rem',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    }}>
      <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
      <div style={{
        marginTop: '0.5rem',
      }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
        }}>{product.product_title}</h3>
        <p style={{
          fontSize: '0.9rem',
          color: '#555',
          marginBottom: '0.5rem',
        }}>{product.product_description}</p>
        <p style={{
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#ff5722',
          marginBottom: '0.5rem',
        }}>¥{product.product_price.toLocaleString()}</p>
        <p style={{
          fontSize: '0.8rem',
          color: '#888',
        }}>購入日: {product.purchase_date}</p>
      </div>

      <button
        className="border-2 enabled:hover:bg-gray-300 enabled:bg-gray-200"
        disabled={clientState.state !== "registered"}
        onClick={() => {
          if (clientState.state !== "registered") {
            showNotification("ログインしてください", product);
            return;
          }
          
          addCart(clientState, setErr, product.product_id)
            .then(() => {
              showNotification("カートに追加しました！", product);
            })
            .catch((reason) => {
              console.error(reason);
              showNotification("カート追加に失敗しました", product);
            });
        }}
      >
        {clientState.state === "registered" ? "カートに入れる" : "ログインしてください"}
      </button>
    </div>
  )
}

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
