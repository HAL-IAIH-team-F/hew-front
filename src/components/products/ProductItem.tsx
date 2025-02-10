import ProductThumbnail from "~/api/useImgData";
import React, {useState} from "react";
import {CreatorData} from "@/(main)/(timeline)/account/profile/accountCard";
import {ProductRes} from "~/res/ProductRes";
import useRoutes from "~/route/useRoutes";

export default function ProductItem(
    {
        product, layout,
    }: {
        product: ProductRes,
        layout: {
            columns: number,
            cardWidth: number,
            cardHeight: number,
        }
    },
) {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const routes = useRoutes()

    return (
        <div
            key={product.product_id}
            className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
            style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                width: '100%',
                height: `${layout.cardHeight}px`,
                transform: hoveredCard === product.product_id ? 'scale(1.01)' : 'scale(1)',
                outline: hoveredCard === product.product_id ? '5px solid rgba(255, 255, 255, 0.5)' : 'none',
            }}
            onMouseEnter={() => setHoveredCard(product.product_id)} // ホバー開始
            onMouseLeave={() => setHoveredCard(null)} // ホバー終了
            onClick={
                event =>
                    routes.account().setProductId(product.product_id).transition(event)
            }
        >
            {/* サムネイル背景 */}
            <div className="absolute inset-0 bg-black">
                <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid}/>
            </div>

            {/* 商品情報オーバーレイ */}
            <div
                className="absolute top-[60%] left-0 w-full h-full p-4"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.6))',
                    backdropFilter: 'blur(0.2px)',
                }}
            >
                <h2
                    className="text-left font-bold text-white absolute left-[5%]"
                    style={{
                        textShadow: '3px 3px 6px rgba(100, 99, 99, 0.7)',
                        fontSize: `${layout.cardWidth * 0.05}px`
                    }}
                >
                    {product.product_title}
                </h2>
                <div className="text-right">
                    <p
                        className="font-bold text-white"
                        style={{
                            fontSize: `${layout.cardWidth * 0.04}px`
                        }}
                    >
                        {product.product_price} 円
                    </p>
                    {product.creator_ids.map((id) => (
                        <div key={id} style={{
                            fontSize: "0.9rem",
                            color: "rgba(255, 255, 255, 0.8)",
                            margin: "0",
                            lineHeight: "1.4",
                        }}>
                            <CreatorData creator_id={id} showView={true}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
