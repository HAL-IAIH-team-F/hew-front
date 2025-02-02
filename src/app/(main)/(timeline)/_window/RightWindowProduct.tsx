// RightWindowProduct.tsx の例

import ProductThumbnail from "~/api/useImgData";
import React, {Dispatch, SetStateAction, useState} from "react";
import {ProductRes} from "@/(main)/search/sample/ProductRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ClientState} from "~/api/context/ClientState";
import {ErrorData} from "../../../../util/err/err";
import {Api} from "~/api/context/Api";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

export default function RightWindowProduct({ product }: { product: ProductRes }) {
  const clientState = useClientState();
  const [err, setErr] = useState<ErrorData>();

  return (
    <div style={styles.cardContainer}>
      <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid} />
      <div style={styles.textArea}>
        <h3 style={styles.title}>{product.product_title}</h3>
        <p style={styles.description}>{product.product_description}</p>
        <p style={styles.price}>¥{product.product_price.toLocaleString()}</p>
        <p style={styles.purchaseDate}>購入日: {product.purchase_date}</p>

        <button
          style={styles.button}
          disabled={clientState.state !== "registered"}
          onClick={() => {
            addCart(clientState, setErr, product.product_id).catch(reason => {
              console.error(reason);
            });
          }}
        >
          カートに入れる
        </button>
        <ErrorMessage error={err} />
      </div>
    </div>
  );
}

async function addCart(
  clientState: ClientState,
  setErr: Dispatch<SetStateAction<ErrorData | undefined>>,
  product_id: string
) {
  if (clientState.state !== "registered") return;
  setErr(undefined);
  const cartResult = await clientState.client.auth(Api.app.gc_api_cart_get, {}, {});
  if (cartResult.error) return setErr(cartResult.error);

  if (typeof cartResult.success === "string") {
    const postResult = await clientState.client.authBody(Api.app.pc_api_cart_post, {}, {
      products: [product_id]
    }, {});
    if (postResult.error) return setErr(postResult.error);
  } else {
    const patchResult = await clientState.client.authBody(Api.app.pac_api_cart_patch, {}, {
      new_products: [product_id]
    }, {});
    if (patchResult.error) return setErr(patchResult.error);
  }
}

const styles: Record<string, React.CSSProperties> = {
  cardContainer: {
    // 背景を親要素（profilepage）の半透明・blurに合わせる
    backgroundColor: "rgba(142, 142, 147, 0.35)",
    backdropFilter: "blur(12px)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.3)", // 薄めの境界線で境目をつける例
    padding: "1rem",
    margin: "1rem",
    // boxShadowなどつけたい場合は加減してみてください
    // boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  textArea: {
    marginTop: "0.5rem",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "0.9rem",
    color: "#fff", // 背景が暗めなら文字を白などにすると読みやすい
    marginBottom: "0.5rem",
  },
  price: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "yellow", // 背景が青系なら黄色など差し色
    marginBottom: "0.5rem",
  },
  purchaseDate: {
    fontSize: "0.8rem",
    color: "#fff",
    marginBottom: "1rem",
  },
  button: {
    border: "none",
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    backgroundColor: "#3498db",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
