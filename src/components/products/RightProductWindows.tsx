import { useEffect, useState } from "react";
import { ErrorMessage } from "../../util/err/ErrorMessage";
import ProductThumbnail from "~/api/useImgData";
import { CSSProperties } from "react";
import useProduct from "~/api/useProducts";
import { Manager } from "~/manager/manager";
import { ProductWindowStyle } from "~/Sidebar/Styles";

interface ProductWindowsProps {
  ProductisOpen: boolean;
  manager: Manager; // Manager 型が定義されていることを前提としています
}

export default function ProductWindows({ ProductisOpen, manager }: ProductWindowsProps) {
  const [productId, setProductId] = useState(manager.value.productId); // 初期値を設定
  const { products, error } = useProduct({ productId: productId });

  // manager.value.productId の変更を監視して状態を更新
  useEffect(() => {
    setProductId(manager.value.productId);
    console.log("Product ID updated:", manager.value.productId);
  }, [manager.value]); // JSON.stringify を削除

  if (error) {
    return <div>Error: {error.message}</div>; // エラーメッセージを表示
  }

  return (
    <div style={ProductWindowStyle(ProductisOpen)}>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.product_id}>
              <h3>{product.product_title}</h3>
              <p>{product.product_description}</p>
              <p>Price: ${product.product_price}</p>
              <p>Purchase Date: {product.purchase_date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p> // プロダクトがない場合のメッセージ
      )}
    </div>
  );
}
