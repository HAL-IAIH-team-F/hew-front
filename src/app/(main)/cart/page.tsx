"use client"
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {useEffect, useState} from "react";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../util/err/err";
import {CartRes} from "@/(main)/cart/CartRes";
import {ErrorMessage} from "../../../util/err/ErrorMessage";
import {SignInOutButton} from "~/auth/nextauth/SignInOutButton";

export default function Page(
  {}: {}
) {
  const clientState = useClientContextState()
  const [err, setErr] = useState<ErrorData | string>()
  const [cart, setCart] = useState<CartRes>()
  useEffect(() => {
    if (clientState.state != "authenticated") return
    clientState.client.auth(Api.app.gc_api_cart_get, {}, {}).then(value => {
      if (value.error) return setErr(value.error)
      // noinspection SuspiciousTypeOfGuard
      if (typeof value.success == "string") return setErr("no cart")
      setCart(value.success)
    })
  }, [clientState.state]);

  return <div>
    <p>cart_id: {cart?.cart_id}</p>
    <p>user_id: {cart?.user_id}</p>
    {cart?.product_ids.map(value => <p key={value}>product_id: {value}</p>)}
    <ErrorMessage error={err}/>
    <SignInOutButton/>
    <button
      className={"border-2 hover:bg-gray-300"} disabled={cart == undefined}
      onClick={() => {
        if (clientState.state != "authenticated") throw new Error("not authenticated")
        clientState.client.authBody(
          Api.app.cart_buy_api_cart_buy_put, {}, undefined, {}
        ).then(value => {
          if (value.error) return setErr(value.error)
        })
      }}
    >購入
    </button>
  </div>
}