import ProductThumbnail from "~/api/useImgData";
import React from "react";
import {ProductRes} from "~/res/ProductRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ClientState} from "~/api/context/ClientState";
import {Api} from "~/api/context/Api";
import {useProductContext} from "~/products/ContextProvider";
import DownloadButton from "@/(main)/(timeline)/_window/_right/DownloadButton";
import {signIn} from "~/auth/clientAuth";

export default function RightWindowProduct(
    {
        product,
    }: {
        product: ProductRes,
    },
) {
    const clientState = useClientState()
    const {showNotification} = useProductContext()

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
                disabled={clientState.state == "loading"}
                onClick={() => {
                    if (clientState.state !== "registered") {
                        signIn(clientState).catch(reason => {
                            showNotification(`ログインに失敗しました: {${reason.toString()}}`)
                        })
                        return;
                    }

                    addCart(clientState, product.product_id)
                        .then(() => {
                            showNotification("カートに追加しました！", product);
                        })
                        .catch((reason) => {
                            console.error(reason);
                            showNotification("カート追加に失敗しました", product);
                        });
                }}
            >
                {clientState.state === "registered" ? "カートに入れる" : "ログインする"}
            </button>
            {product.purchase_info && <DownloadButton purchaseInfo={product.purchase_info}/>}
        </div>
    )
}

async function addCart(
    clientState: ClientState,
    product_id: string
) {
    if (clientState.state != "registered") return
    const cartResult = await clientState.client.auth(Api.app.gc_api_cart_get, {}, {})
    if (cartResult.error) return console.error(cartResult.error)
    const patchResult = await clientState.client.authBody(Api.app.pac_api_cart_patch, {}, {
        new_products: [product_id]
    }, {})
    if (patchResult.error) return console.error(patchResult.error)
}
