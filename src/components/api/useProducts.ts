import {useEffect, useState} from "react";
import {ErrorData} from "../../util/err/err";
import {ProductRes} from "~/products/ProductRes";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";

interface UseProductOptions {
  productId?: string;
  limit?: number;
  uuid?: string;
}

export default function useProduct(options: UseProductOptions = {}) {
  const [products, setProducts] = useState<ProductRes[]>([]);
  const [error, setError] = useState<ErrorData>();
  const client = useClientContextState();

  useEffect(() => {
    if (client.state === "loading") return;

    const {productId, limit, uuid} = options;
    client.client.unAuthOrAuth(Api.app.gps_api_product_get, {
      limit: limit
    }, {}).then((value) => {
      if (value.error) {
        setError(value.error);
        setProducts([]); // エラー時に既存データをクリア
        return;
      }

      let fetchedProducts = Array.isArray(value.success) ? value.success : [];

      if (productId) {
        fetchedProducts = fetchedProducts.filter(
          (product) => product.product_id === productId
        );
      }

      setProducts(fetchedProducts);
    });
  }, [options.productId, client.state]); // productId を依存関係に追加

  return {products, error};
}
