import {useEffect, useState} from "react";
import {ProductRes} from "~/res/ProductRes";
import {ErrorData} from "../../util/err/err";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import {LoadingState} from "~/auth/State";

export type ProductState = LoadingState | {
  state: "success",
  product: ProductRes,
} | {
  state: "error",
  error: ErrorData,
}

export default function useProduct(productId: string | undefined) {
  const [productState, setProductState] = useState<ProductState>({state: "loading"});
  const clientState = useClientState();

  useEffect(() => {
    if (clientState.state === "loading") return;
    if (productId === undefined) return;

    clientState.client.unAuthOrAuth(Api.app.gp_api_product__product_id__get, {}, {
      product_id: productId,
    }).then((value) => {
      if (value.error) return setProductState({
        state: "error",
        error: value.error,
      })
      setProductState({
        state: "success",
        product: value.success,
      })
    })


  }, [clientState.state, productId]); // productId を依存関係に追加

  return productState;
}