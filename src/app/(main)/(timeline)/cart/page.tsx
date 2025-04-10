"use client"
import React, {useEffect, useState} from 'react';
import {ShoppingCart, Trash2} from 'lucide-react';
import useProduct from '~/hooks/useProduct';
import {useProductContext} from '~/products/ContextProvider';
import {useClientState} from '~/api/context/ClientContextProvider';
import {Api} from '~/api/context/Api';
import ProductThumbnail from '~/api/useProductThumbnail';
import LoginNeed from '~/UI/loginNeed';

interface ErrorData {
  message: string;
  code?: string;
}

interface CartRes {
  cart_id: string;
  user_id: string;
  product_ids: string[]
}

interface Product {
  product_id: string;
  product_title: string;
  product_price: number;
  product_thumbnail_uuid: string;
}

interface ProductListProps {
  productId?: string;
}

const CartPage = () => {
  const clientState = useClientState();
  const [err, setErr] = useState<ErrorData | string>();
  const [cart, setCart] = useState<CartRes>();
  const {showNotification, showPurchaseYesNo} = useProductContext()
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (clientState.state != "registered") return;
    clientState.client.auth(Api.app.gc_api_cart_get, {}, {}).then((value) => {
      if (value.error) return setErr(value.error);
      // noinspection SuspiciousTypeOfGuard
      if (typeof value.success == "string") return setErr("no cart");
      if (value.success.product_ids.length === 0) return setErr("no cart");
      // console.log("cart",value.success)
      setCart(value.success);
    });
  }, [clientState.state]);

  if (clientState.state !== "registered") {
    return (
        <div>
          <LoginNeed/>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-6xl mx-auto px-7 py-10">
          <h1 className="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-2">
            <ShoppingCart className="w-8 h-8"/>
            カート
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="flex-grow">
              <div className="bg-gray-800 rounded-lg shadow-lg">
                {cart?.product_ids.map((value) => (
                    <div key={value} className="border-b border-gray-700 last:border-b-0">
                      <ProductList productId={value}/>
                    </div>
                ))}
              </div>
              {err && (
                  <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-lg">
                    {typeof err === 'string' ? err : err.message}
                  </div>
              )}
            </div>

            {/* Order Summary Section */}
            <div className="w-full md:w-80">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg sticky top-4">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-100">注文内容</h2>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">商品の小計</span>
                      <span className="font-bold text-gray-100">{totalPrice}円</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">割引適応</span>
                      <span className="text-green-400">10%OFF</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-100">合計</span>
                      <span className="text-lg font-bold text-gray-100">{totalPrice - totalPrice / 10}円 </span>
                    </div>
                  </div>
                </div>

                <button
                    className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors ${
                        !cart
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed pointer-events-none"
                            : "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                    }`}
                    disabled={!cart}
                    onClick={(e) => {
                      e.preventDefault();
                      if (cart) showPurchaseYesNo();
                    }}
                >
                  {!cart ? "カートが空です" : "レジに進む"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

const ProductList: React.FC<ProductListProps> = ({productId}) => {
  const productState = useProduct(productId);
  if (productState.state !== "success") {
    return (
        <div className="p-4 text-gray-400 text-center">
          商品が見つかりませんでした
        </div>
    );
  }
  return (
      <>
        <div key={productState.product.product_id} className="p-4 hover:bg-gray-700/50">
          <div className="flex items-center gap-4">
            {/* Product Image */}
            <div className="w-32 h-32 bg-gray-700 rounded-md overflow-hidden flex-shrink-0 relative">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full object-cover">
                  <ProductThumbnail
                      product_thumbnail_uuid={productState.product.product_thumbnail_uuid}
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-gray-100 mb-1">
                {productState.product.product_title}
              </h3>
              <div className="text-xl font-bold text-red-400 mb-2">
                {productState.product.product_price.toLocaleString()}円
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-4">

                <button
                    className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4"/>
                  削除
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-bold text-gray-100">
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default CartPage;