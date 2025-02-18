import {useEffect, useState} from "react";
import {ErrorData} from "../../util/err/err";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import {ProductRes} from "@/(main)/search/sample/ProductRes";

interface UseProductOptions {
  productId?: string;
  limit?: number;
  uuid?: string;
  name?: string;
  tag?: string;
  post_by?: string;
}

export default function useProducts(options: UseProductOptions = {}) {
  const [products, setProducts] = useState<ProductRes[]>([]);
  const [error, setError] = useState<ErrorData>();
  const client = useClientState();

  useEffect(() => {
    if (client.state === "loading") return;

    const {limit, name, tag, post_by} = options;
    console.debug("useProducts", options);
    if (post_by != undefined && post_by == "") {
      setProducts([]);
      return
    }
    client.client.unAuthOrAuth(Api.app.gps_api_product_get, {
      queries: {
        limit: limit,
        name: name,
        tag: tag,
        post_by: post_by,
      }
    }, {}).then((value) => {
      if (value.error) {
        setError(value.error);
        setProducts([]); // エラー時に既存データをクリア
        return;
      }
      console.debug("useProducts result", value);

      setProducts(value.success);
    });
  }, [options.productId, options.name, options.tag, client.state]); // productId を依存関係に追加

  return {products, error};
}
