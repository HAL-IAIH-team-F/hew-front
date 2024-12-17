import { useEffect, useState } from "react";
import { ErrorMessage } from "../../util/err/ErrorMessage";
import ProductThumbnail from "~/api/useImgData";
import { CSSProperties } from "react";
import useProduct from "~/api/useProducts";
import { Manager } from "~/manager/manager";
import { ProductWindowStyle } from "~/Sidebar/Styles";
import { Productmanager } from "~/manager/ProductManager";

interface ProductWindowsProps {
  manager: Manager;
  productManager: Productmanager
}

export default function ProductWindows({ manager, productManager }: ProductWindowsProps) {
  const [productId, setProductId] = useState(manager.value.productId); 
  const { products, error } = useProduct({ productId: productId });

  useEffect(() => {
    setProductId(manager.value.productId);
    console.log("Product ID updated:", manager.value.productId);
  }, [manager.value]); 

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div style={ProductWindowStyle(productManager.value.isWindowOpen)}>
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
