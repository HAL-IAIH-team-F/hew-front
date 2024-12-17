import {useEffect, useState} from "react";
import {ErrorData} from "../../util/err/err";
import {ProductRes} from "~/products/ProductRes";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";


interface UseProductOptions {
  productId?: string;
  limit?: number;
}

export default function useProduct(options: UseProductOptions = {}) {
  const [products, setProducts] = useState<ProductRes[]>([]);
  const [error, setError] = useState<ErrorData>();
  const client = useClientContextState();

  useEffect(() => {
    if (client.state == "loading") return
    const {productId, limit} = options;
    const params: Record<string, any> = {};
    if (limit) params.limit = limit;
    client.client.unAuthOrAuth(Api.app.gps_api_product_get, params).then((value) => {
      if (value.error) {
        setError(value.error);
        return;
      }

      let fetchedProducts = Array.isArray(value.success) ? value.success : [];

      if (productId) {
        fetchedProducts = fetchedProducts.filter(
          (product) => product.product_id === productId
        );
      } else {
        console.log("ｳﾋﾋ");
      }

      setProducts(fetchedProducts);
    });
  }, []);

  return {products, error};
}
