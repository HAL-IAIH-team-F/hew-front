"use client"
import {useEffect, useState} from "react";

import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import {ProductRes} from "~/res/ProductRes";
import ProductLayout from "~/products/layout/ProductLayout";

export default function Page(
    {}: {}
) {
    const [products, setProducts] = useState<ProductRes[]>([])
    const clientState = useClientState()
    useEffect(() => {
        if (clientState.state != "registered") return
        clientState.client.auth(Api.app.gps_api_product_get, {isBought: true}, {}).then(value => {
            if (value.error) return console.error(value.error)
            setProducts(value.success)
        })

    }, [clientState.state]);

    return <div className={"overflow-y-scroll h-full"}>
        <ProductLayout products={products} className={"w-full"}/>
    </div>
}