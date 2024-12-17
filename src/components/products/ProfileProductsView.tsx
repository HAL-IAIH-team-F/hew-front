import { useEffect, useState } from "react";
import { ErrorMessage } from "../../util/err/ErrorMessage";
import ProductThumbnail from "~/api/useImgData";
import { CSSProperties } from "react";
import useProduct from "~/api/useProducts";
import { Manager } from "~/manager/manager";
import { ProductRes } from "./ProductRes";
import { Productmanager } from "~/manager/ProductManager";

interface ProductPageProps {
    manager: Manager;
    productManager: Productmanager
}

export default function ProfileProductsView({ manager, productManager }: ProductPageProps) {
    // 商品データの取得
    const { products, error } = useProduct(); 
    const [selectProduct, setSelectProduct] = useState<ProductRes[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    // 選択された商品IDをもとに追加データを取得
    const { products: updatedProducts } = useProduct({ productId: selectedProductId || "" });

    useEffect(() => {
        if (updatedProducts && selectedProductId) {
            setSelectProduct(updatedProducts); // まずはselectProductを更新
        }
    }, [updatedProducts, selectedProductId]);
    
    useEffect(() => {
        if (selectProduct.length > 0) {
            // selectProduct 配列から最初の商品の product_id を取得
            const productId = selectProduct[0].product_id;
    
            if (productId) {
                productManager.update.productId(productId); // productIdはstring型
            }
        }
    }, [selectProduct]);

    // 商品がクリックされた時の処理
    const handleProductClick = (product: ProductRes) => {
            setSelectedProductId(product.product_id); // 商品IDを状態として設定
            productManager.update.isWindowOpen(true);
        };
        
    

    return (
        <div style={styles.container}>
            <ErrorMessage error={error} />
            <div style={styles.gridContainer}>
                {products.length > 0 ? (
                    <div style={styles.grid}>
                        {products.map((product) => (
                            <div
                                key={product.product_id}
                                style={styles.card}
                                onClick={() => handleProductClick(product)}
                            >
                                <div style={styles.innerFrame}></div>
                                <div style={styles.thumbnailWrapper}>
                                    <ProductThumbnail product_thumbnail_uuid={product.product_thumbnail_uuid} />
                                </div>
                                <div style={styles.details}>
                                    <h2 style={styles.title}>{product.product_title}</h2>
                                    <p style={styles.description}>{product.product_description}</p>
                                    <p style={styles.price}><strong>{product.product_price}円</strong></p>
                                    <p style={styles.date}><strong>日付:</strong> {product.purchase_date}</p>
                                    <p style={styles.date}><strong>@</strong> {product.creator_ids.join(", ")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.noProducts}>商品が見つかりません。</div>
                )}
            </div>
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        minHeight: "100vh",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        width: "100%",
        maxWidth: "1200px",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        overflow: "hidden",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.2))",
        backdropFilter: "blur(20px)",
        boxShadow: "0 10px 30px rgba(255, 255, 255, 0.01), inset 0 0 15px rgba(255, 255, 255, 0.01)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        padding: "10px",
    },
    innerFrame: {
        position: "absolute",
        top: "0.5px",
        left: "0.5px",
        right: "0.5px",
        bottom: "0.5px",
        borderRadius: "18px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        pointerEvents: "none",
    },
    thumbnailWrapper: {
        width: "100%",
        height: "200px",
        backgroundColor: "#000",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "6px",
    },
    details: {
        padding: "15px",
        display: "flex",
        flexDirection: "column",
    },
    title: {
        fontSize: "1.2em",
        color: "#FFFFFF",
        fontWeight: "600",
        marginBottom: "10px",
    },
    description: {
        fontSize: "0.9em",
        color: "#A3A3A3",
        lineHeight: "1.5",
        marginBottom: "10px",
    },
    price: {
        fontSize: "1em",
        color: "#FFD700",
        fontWeight: "700",
    },
    date: {
        fontSize: "0.8em",
        color: "#AAAAAA",
    },
    noProducts: {
        fontSize: "1.5em",
        color: "#AAAAAA",
        marginTop: "20px",
    },
};
