import ProductItem from "~/products/ProductItem";
import useLayout from "~/hooks/useLayout";
import {ProductRes} from "~/res/ProductRes";
import {sx} from "../../../util/util";

export default function ProductLayout(
    {
        products, className,
    }: {
        products: ProductRes[],
        className?: string,
    },
) {

    const layout = useLayout()

    return (
        <div className={sx("p-6 overflow-y-auto flex-grow min-h-0", className)} ref={layout.ref}>
            <div
                className={"grid gap-5 mx-auto"}
                style={{
                    gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
                    maxWidth: `${layout.cardWidth * layout.columns + (layout.columns - 1) * 20}px`
                }}
            >
                {products.map(product => <ProductItem product={product} layout={layout} key={product.product_id}/>)}
            </div>
        </div>
    )
}
