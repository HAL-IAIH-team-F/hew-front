"use client"
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useClientContext} from "~/api/useClientContext";
import {apiClient} from "~/api/wrapper";
import { ErrorData } from "../../util/err/err";
import { ErrorMessage } from "../../util/err/ErrorMessage";
import { ProductRes } from "./ProductRes";

export default function Page(
  {}: {}
) {
  const [Product, setProduct] = useState<ProductRes[]>()
  const [err, setErr] = useState<ErrorData>()
  const session = useSession()
  const client = useClientContext(session)

  useEffect(() => {
    client.exec(apiClient.gps_api_products_get, {}).then(value => {
      if (value.error) return setErr(value.error)
        
    })
  }, []);

  return <div>
    <ErrorMessage error={err}/>
    {Product && Product.map(Product =>
        <div>{Product.product_description}</div>
    )}
  </div>
}