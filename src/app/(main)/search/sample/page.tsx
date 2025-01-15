"use client"
import {useClientState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {Api} from "~/api/context/Api";
import {ProductRes} from "@/(main)/search/sample/ProductRes";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import {useRouter} from "next/navigation";

export default function Page(
  {}: {}
) {
  const clientState = useClientState()
  const [products, setProducts] = useState<ProductRes[]>([])
  const [err, setErr] = useState<ErrorData>()

  useEffect(() => {
    if (clientState.state == "loading") return
    clientState.client.unAuthOrAuth(Api.app.gps_api_product_get, {}, {}).then(value => {
      if (value.error) return setErr(value.error)
      setProducts(value.success)
    })
  }, [clientState.state]);
const router = useRouter()

  return <div>
    {products.map(value => <div
      key={value.product_id} className={"border-2 cursor-pointer"}
      onClick={() => router.push(`/search/sample/${value.product_id}`)}
    >
      <p>product_description: {value.product_description}</p>
      <p>product_id: {value.product_id}</p>
      <p>product_thumbnail_uuid: {value.product_thumbnail_uuid}</p>
      <p>product_price: {value.product_price}</p>
      <p>product_title: {value.product_title}</p>
      <p>purchase_date: {value.purchase_date}</p>
      <p>creator_ids: {value.creator_ids}</p>
    </div>)}
    <ErrorMessage error={err}/>
  </div>
}