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
  post_by?: string[];
}

export default function useProducts(options: UseProductOptions = {}) {
  const [products, setProducts] = useState<ProductRes[]>([]);
  const [error, setError] = useState<ErrorData>();
  const client = useClientState();

  useEffect(() => {
    if (client.state === "loading") return;
    
    const {productId, limit, name, tag, post_by} = options;
    if (post_by?.length == 0) {
      setProducts([]);
      return
    }
    client.client.unAuthOrAuth(Api.app.gps_api_product_get, {
      limit: limit,
      name: name,
      tag: tag,
      post_by: post_by,
    }, {}).then((value) => {
      if (value.error) {
        setError(value.error);
        setProducts([]); // エラー時に既存データをクリア
        return;
      }

      let fetchedProducts = Array.isArray(value.success) ? value.success : [];
      if (post_by) {
        fetchedProducts = fetchedProducts.filter(
          (product) => product.post_by === post_by
        );
      }
      if (productId) {
        fetchedProducts = fetchedProducts.filter(
          (product) => product.product_id === productId
        );
      }
      if (name) {
        fetchedProducts = fetchedProducts.filter(
          (product) => product.product_title === name
        );
      }
      if (tag) {
        fetchedProducts = fetchedProducts.filter(
          (product) => product.product_description === tag
        );
      }

      setProducts(fetchedProducts);
    });
  }, [options.productId, options.name, options.tag,client.state]); // productId を依存関係に追加

  return {products, error};
}
