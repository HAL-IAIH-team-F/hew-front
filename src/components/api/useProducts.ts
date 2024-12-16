import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useClientContext } from "./useClientContext";
import { ErrorData } from "../../util/err/err";
import { apiClient } from "./wrapper";
import { ProductRes } from "~/products/ProductRes";


interface UseProductOptions {
    productId?: string;
    limit?: number;
}

export default function useProduct(options: UseProductOptions = {}) {
    const [products, setProducts] = useState<ProductRes[]>([]);
    const [error, setError] = useState<ErrorData>();
    const session = useSession();
    const client = useClientContext(session);

    useEffect(() => {
        const { productId, limit } = options;
        const params: Record<string, any> = {};

        if (limit) params.limit = limit;

        client.exec(apiClient.gps_api_product_get, params).then((value) => {
            if (value.error) {
                setError(value.error);
                return;
            }

            let fetchedProducts = Array.isArray(value.value) ? value.value : [];

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

    return { products, error };
}
