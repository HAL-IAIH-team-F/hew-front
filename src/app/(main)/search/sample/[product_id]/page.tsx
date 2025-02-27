"use client"
import {useClientState} from "~/api/context/ClientContextProvider";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ProductRes} from "@/(main)/search/sample/ProductRes";
import {ErrorData} from "../../../../../util/err/err";
import {Api} from "~/api/context/Api";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";
import {SignInOutButton} from "~/auth/SignInOutButton";
import {ClientState} from "~/api/context/ClientState";

export default function Page(
  {
    params: {
      product_id,
    }
  }: {
    params: {
      product_id: string
    }
  }
) {
  const clientState = useClientState()
  const [product, setProduct] = useState<ProductRes>()
  const [err, setErr] = useState<ErrorData>()

  useEffect(() => {
    if (clientState.state == "loading") return
    clientState.client.unAuthOrAuth(Api.app.gp_api_product__product_id__get, {}, {
      product_id: product_id,
    }).then(value => {
      if (value.error) return setErr(value.error)
      setProduct(value.success)
    })
  }, [clientState.state]);


  return <div className={"border-2"}>
    {product &&
      <div>
        <p>product_description: {product.product_description}</p>
        <p>product_id: {product.product_id}</p>
        <p>product_thumbnail_uuid: {product.product_thumbnail_uuid}</p>
        <p>product_price: {product.product_price}</p>
        <p>product_title: {product.product_title}</p>
        <p>purchase_date: {product.purchase_date}</p>
        <p>creator_ids: {product.creator_ids}</p>
      </div>
    }
    <ErrorMessage error={err}/>
    <SignInOutButton className={"border-2"}/>
    <button
      className={"border-2  enabled:hover:bg-gray-300 enabled:bg-gray-200"}
      disabled={clientState.state != "registered"}
      onClick={() => {
        addCart(clientState, setErr, product_id).catch(reason => {
          console.error(reason)
        })
      }}
    >カートに入れる
    </button>
  </div>
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
