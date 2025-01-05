"use client"
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {ProductRes} from "@/(main)/search/sample/ProductRes";
import {ErrorData} from "../../../../../util/err/err";
import {Api} from "~/api/context/Api";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";

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
  const clientState = useClientContextState()
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


  return <div>
    {product &&
      <div className={"border-2"}>
        <p>product_description: {product.product_description}</p>
        <p>product_id: {product.product_id}</p>
        <p>product_thumbnail_uuid: {product.product_thumbnail_uuid}</p>
        <p>product_price: {product.product_price}</p>
        <p>product_title: {product.product_title}</p>
        <p>purchase_date: {product.purchase_date}</p>
        <p>product_contents_uuid: {product.product_contents_uuid}</p>
        <p>creator_ids: {product.creator_ids}</p>
      </div>
    }
    <ErrorMessage error={err}/>
  </div>
}