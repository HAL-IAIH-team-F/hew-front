import React, {Dispatch, SetStateAction, useState} from "react";
import {ProductRes} from "@/(main)/search/sample/ProductRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ClientState} from "~/api/context/ClientState";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../../util/err/err";
import {useProductContext} from "~/products/ContextProvider";
import ProductThumbnail from "~/api/useProductThumbnail";
import {Lock, ShoppingCart} from "lucide-react";
import {Button, Card, CardContent, CardFooter, CardHeader} from "./UI";
import CreatorIconCard from "~/Icon/CreatorIconCard";

export default function RightWindowProduct({
                                             product,
                                           }: {
  product: ProductRes;
}) {
  const clientState = useClientState();
  const [_, setErr] = useState<ErrorData>();
  const {showNotification} = useProductContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
      <Card className="group relative overflow-hidden backdrop-blur-sm overflow-y-auto" style={{
        
        boxSizing: "border-box",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}>
        <div
            className="relative aspect-square overflow-hidden rounded-t-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          <div
              className={`absolute inset-0 transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          >
            <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
          </div>
          <div
              className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold leading-snug">{product.product_title}</h1>
          </div>
        </CardHeader>

        {product.creator_ids.map((id) => (
            <div className="relative left-5">
              <CreatorIconCard creator_id={id}/>
            </div>
        ))}


        <CardContent>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-500">
              ¥{product.product_price.toLocaleString()}
            </p>
          </div>

          {/* 説明欄の区切り線 */}
          <hr className="my-3 border-gray-300 dark:border-gray-600"/>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">説明欄</p>
          <p className="line-clamp-3 text-sm mt-2">{product.product_description}</p>

          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"/>
            発売日: {product.purchase_date}
          </div>
        </CardContent>


        
      </Card>
  );
}

