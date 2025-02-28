"use client"
import {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import { ProductRes } from "@/(main)/search/sample/ProductRes";
import DownloadButton from "./DownloadButton";
import ProductThumbnail from "~/api/useProductThumbnail";
import LoginNeed from "~/UI/loginNeed";

const PurchaseHistoryCard = () => {
  const [products, setProducts] = useState<ProductRes[]>([])
  const clientState = useClientState()

  useEffect(() => {
    if (clientState.state !== "registered") return
    clientState.client.auth(Api.app.gps_api_product_get, {isBought: true}, {}).then(value => {
      if (value.error) {
        console.error(value.error)
        return
      }
      setProducts(value.success)
    })
  }, [clientState.state]);
  if (clientState.state !== "registered") {
    return (
        <div>
          <LoginNeed/>
        </div>
    )
  }

  return (
    <div className="p-6 text-gray-100">
      <h2 className="text-xl font-bold mb-4">購入履歴</h2>
      <div  
        className="overflow-y-auto" 
        style={{                  
          height: "calc(100vh - 100px)",
          maxHeight: "calc(100vh - 180px)",
          boxSizing: "border-box",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
        {products.length === 0 ? (
          <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-lg">
            購入した商品がありません
          </div>
        ) : (
          <ul className="space-y-2">
            {products.map((purchase) => (
              purchase.purchase_info ? (
                <li key={purchase.product_title} className="p-4 bg-gray-700 rounded-lg shadow flex items-center justify-between">
                  <div className="w-16 h-16 flex-shrink-0">
                    <ProductThumbnail product_thumbnail_uuid={purchase.product_thumbnail_uuid} />
                  </div>
                  <div className="flex-1 ml-4">
                    <p className="text-lg font-semibold">{purchase.product_title}</p>
                    <p className="text-sm text-gray-400">{purchase.purchase_date}</p>
                    <p className="text-md text-green-300">{purchase.product_price}円</p>
                  </div>
                  <DownloadButton purchaseInfo={purchase.purchase_info} />
                </li>
              ) : null
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistoryCard;
